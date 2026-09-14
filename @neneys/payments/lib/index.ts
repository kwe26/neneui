import express from "express";

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
    SecretKey: string,
    PaymentGateways: PaymentGateway[],
    ServerPort?: number
}

export function NenePayments({
    NeneUI = false,
    PaymentGateways,
    SecretKey= "none",
    ServerPort = 9090
}: NenePayments) {
    const app = express.Router();

    app.get("/_nenep_/", (req, res) => {
        res.json({p: 1});
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


    return app;
}