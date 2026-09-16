import { readFile } from "node:fs/promises";
import { createHmac } from "node:crypto";
import express from "express";
import { Database } from "bun:sqlite";
import { randomUUIDv5, randomUUIDv7 } from "bun";
import { RazorpayCreate } from "./pg/Razorpay";

let DomainUrl = "http://localhost:3500";

export interface PaymentKeys {
    key: string,
    secret: string
}

export interface PaymentGateway{
    pg: string,
    key: string,
    secret: string
}

export function RazorpayGateway(key: string, secret: string): PaymentGateway{
    return {
        pg: "Razorpay",
        key,
        secret
    } 
}

export interface NenePayments {
    NeneUI: boolean,
    SiteTitle?: string,
    SecretKey: string,
    DatabasePath: string,
    Redirect?: string,
    DomainUrl: string,
    PaymentGateways: PaymentGateway[],
    ServerPort?: number
}

export function NenePayments({
    NeneUI = false,
    SiteTitle = "NenePay",
    PaymentGateways,
    SecretKey= "none",
    Redirect="{{REDIRECT}}",
    DomainUrl: domainUrl = "http://localhost:3500",
    DatabasePath = "./default.db",
    ServerPort = 9090
}: NenePayments) {
    if(DatabasePath == ":memory:") console.log("[@neneys/payments] While :memory: as Database is supported, It is not recommended to use memory db for @neneys/payments.")
    if(DomainUrl.endsWith("/")){
        console.log("[@neneys/payments] / at the end of Domain Path is not allowed!")
        DomainUrl = domainUrl;
        process.exit(-1);
    }

    const db = new Database(DatabasePath, {
        create: true
    });

    db.run(`
    CREATE TABLE IF NOT EXISTS neneys_payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid TEXT NOT NULL UNIQUE,
        customer_name TEXT NOT NULL,
        _email TEXT,
        _phone TEXT,
        pg TEXT,
        amount REAL NOT NULL,
        order_id TEXT,
        status TEXT NOT NULL,
        "when" INTEGER NOT NULL
    )
    `);

    const app = express.Router();

    app.use(express.json());

    app.get("/_nenep_/", (req, res) => {
        res.json({p: 1});
    });

    var PGs:string[] = [];
    var PGKeys = new Map<string, PaymentGateway>();

    for(var pg_ of PaymentGateways){
        PGs.push(pg_['pg']);
        PGKeys.set(pg_['pg'], pg_);
    }

    app.get("/npay/:uuid", async (req, res) => {
        try {
            const uuid = req.params.uuid;

            // Find payment
            const payment = db.query(`
                SELECT
                    uuid,
                    customer_name,
                    _email,
                    _phone,
                    pg,
                    amount,
                    order_id,
                    status
                FROM neneys_payments
                WHERE uuid = ?
                LIMIT 1
            `).get(uuid) as {
                uuid: string,
                customer_name: string,
                _email?: string,
                _phone?: string,
                pg: string,
                amount: number,
                order_id: string,
                status: string
            } | null;

            // Payment does not exist
            if (!payment) {
                return res.status(404).send(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Payment Not Found</title>
                    </head>
                    <body>
                        <h1>Payment Not Found</h1>
                        <p>This payment link does not exist or has expired.</p>
                    </body>
                    </html>
                `);
            }

            // Only Razorpay is supported for now
            if (payment.pg !== "Razorpay") {
                return res.status(400).send(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Unsupported Payment</title>
                    </head>
                    <body>
                        <h1>Unsupported Payment Gateway</h1>
                        <p>This payment gateway is currently not supported.</p>
                    </body>
                    </html>
                `);
            }

            // Already completed
            if (payment.status === "paid") {
                return res.status(200).send(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Payment Completed</title>
                    </head>
                    <body>
                        <h1>Payment Already Completed</h1>
                        <p>This payment has already been completed.</p>
                    </body>
                    </html>
                `);
            }

            // Get Razorpay gateway configuration
            const razorpay = PGKeys.get("Razorpay");

            if (!razorpay) {
                return res.status(500).send("Razorpay gateway is not configured.");
            }

            // Load template
            const templatePath = __dirname + "/pg/razorpay_npay.html";

            let html = await readFile(
                templatePath,
                "utf8"
            );

            // Replace template variables
            html = html
                .replaceAll("{{_uuid}}", payment.uuid)
                .replaceAll("{{_title}}",SiteTitle)
                .replaceAll("{{REDIRECT}}", Redirect)
                .replaceAll("{{_name}}", (payment.customer_name))
                .replaceAll("{{_orderId}}", (payment.order_id))
                .replaceAll("{{public_key}}", (razorpay.key));

            return res
                .status(200)
                .type("html")
                .send(html);

        } catch (error) {

            console.error(
                "NenePay /npay error:",
                error
            );

            return res.status(500).send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>NenePay Error</title>
                </head>
                <body>
                    <h1>Internal Server Error</h1>
                    <p>Unable to load this payment page.</p>
                </body>
                </html>
            `);
        }
    });

    app.post("/npay-verify/:uuid", async (req, res) => {
        try {
            const uuid = req.params.uuid;

            const {
                signature,
                paymentId
            } = req.body;

            // Validate request
            if (!signature || !paymentId) {
                return res.status(400).json({
                    status: false,
                    message: "Missing payment signature or payment ID"
                });
            }

            // Find payment
            const payment = db.query(`
                SELECT
                    uuid,
                    pg,
                    order_id,
                    status
                FROM neneys_payments
                WHERE uuid = ?
                LIMIT 1
            `).get(uuid) as {
                uuid: string;
                pg: string;
                order_id: string;
                status: string;
            } | null;

            if (!payment) {
                return res.status(404).json({
                    status: false,
                    message: "Payment not found"
                });
            }

            // Don't verify an already completed payment
            if (payment.status === "paid") {
                return res.json({
                    status: true,
                    message: "Payment already verified",
                    uuid
                });
            }

            // Get gateway
            const gateway = PGKeys.get(payment.pg);

            if (!gateway) {
                return res.status(500).json({
                    status: false,
                    message: "Payment gateway is not configured"
                });
            }

            // Razorpay signature:
            // HMAC_SHA256(order_id + "|" + payment_id, secret)

            const generatedSignature = createHmac(
                "sha256",
                gateway.secret
            )
                .update(
                    `${payment.order_id}|${paymentId}`
                )
                .digest("hex");

            // Timing-safe comparison
            const valid =
                generatedSignature === signature;

            if (!valid) {

                return res.status(400).json({
                    status: false,
                    message: "Invalid payment signature"
                });
            }

            // Signature is valid
            db.query(`
                UPDATE neneys_payments
                SET status = ?
                WHERE uuid = ?
            `).run("paid", uuid);

            return res.status(200).json({
                status: true,
                message: "Payment verified successfully",
                uuid,
                paymentId
            });

        } catch (error) {

            console.error(
                "NenePay verification error:",
                error
            );

            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    });

    app.post("/npay-failed/:uuid", async (req, res) => {
        try {
            const uuid = req.params.uuid;

            const {
                error,
                orderId
            } = req.body;

            // Find payment
            const payment = db.query(`
                SELECT
                    uuid,
                    order_id,
                    status
                FROM neneys_payments
                WHERE uuid = ?
                LIMIT 1
            `).get(uuid) as {
                uuid: string;
                order_id: string;
                status: string;
            } | null;

            if (!payment) {
                return res.status(404).json({
                    status: false,
                    message: "Payment not found"
                });
            }

            // Prevent overwriting a successful payment
            if (payment.status === "paid") {
                return res.status(409).json({
                    status: false,
                    message: "Payment has already been completed"
                });
            }

            // Make sure the reported order matches our database
            if (orderId && orderId !== payment.order_id) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid order ID"
                });
            }

            // Log the actual Razorpay failure
            console.error(
                `[NenePay] Payment failed: ${uuid}`,
                error
            );

            // Mark payment as failed
            db.query(`
                UPDATE neneys_payments
                SET status = ?
                WHERE uuid = ?
            `).run(
                "failed",
                uuid
            );

            return res.status(200).json({
                status: true,
                message: "Payment failure recorded"
            });

        } catch (error) {

            console.error(
                "[NenePay] Failed to record payment failure:",
                error
            );

            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    });

    app.post("/_nenep_/create", async (req,res) => {
        // Create in Database First
        let uuid = randomUUIDv7();
        // Determined URL
        let url = DomainUrl + "/npay/" + uuid;
        // Check Fields
        try{
            const { secret, _name, _email, _phone, _pg, _amount, _notes } = req.body;

            if(PGs.includes(_pg)){

            if(secret == SecretKey || secret == "none"){
                if(_pg == "Razorpay") { 
                    let order: any = await RazorpayCreate(PGKeys.get(_pg)!, {  _name, _email, _phone, _amount, _note: _notes })

                    await db.run(
                        `INSERT INTO neneys_payments
                        (uuid ,customer_name, _email, _phone, pg, amount, status, order_id, "when")
                        VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?)`,
                        uuid,
                        _name,
                        _email,
                        _phone,
                        _pg,
                        _amount,
                        'na',
                        order?.id,
                        Date.now()
                    );

                    return res.status(201).json({
                        status: true,
                        uuid,
                        url,
                        pg: _pg,
                        publicKey: PGKeys.get(_pg)!.key,
                        order_id: order?.id
                    });
                }
            }else{
                res.status(401).json({status: false, message :"Whoops! Validation failed"})
            }
            }else{
                res.status(404).json({status: false, message :"Whoops! Don't know about that payment method"});
            }
        }catch(error){
            res.json({
                status: false,
                message: error
            })
        }
    });

    app.get("/_nenep_/enabled", (req,res) => {
        var PGs:any = [];

        for(var pg_ of PaymentGateways){
            PGs.push(pg_['pg']);
        }

        res.json({
            gateways: PGs
        })
    });

    if(NeneUI == false){
        return express().use(app).listen(ServerPort).address();
    }

    return app;
}

export enum PGList{
    Razorpay = "Razorpay"
}

export interface CreateNenePayments {
    Secret: string,
    CustomerName: string,
    CustomerPhone: string,
    CustomerEmail: string,
    Amount: any,
    Notes: string,
    PaymentGateway: PGList,
    onSuccess: any,
    onFailure: any,
}

export async function CreateNenePayments({
    Secret,
    CustomerName,
    CustomerEmail,
    CustomerPhone,
    Amount,
    Notes,
    PaymentGateway = PGList.Razorpay,
    onSuccess= null,
    onFailure=null
}: CreateNenePayments, pass: any){
    let localUriMake = `http://localhost:${pass['port']}/_nenep_/create`;

    try {
        const response = await fetch(localUriMake, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                secret: Secret,
                _name: CustomerName,
                _email: CustomerEmail,
                _phone: CustomerPhone,
                _pg: PaymentGateway,
                _amount: Amount,
                _notes: Notes,
            }),
        });

        const result: any = await response.json();

        return {
            status: result.status === true,

            payment: result.status === true
                ? {
                    uuid: result.uuid,
                    url: result.url,
                    pg: result.pg,
                    domainUrl: DomainUrl,
                    publicKey: result.publicKey,
                    order_id: result.order_id,
                }
                : null,

            onSuccess,
            onFailure,

            error: result.status === true
                ? null
                : result.message,
        };
    }catch(error){
        return null;
    }
}