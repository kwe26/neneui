import type { PaymentGateway } from "..";

export async function RazorpayCreate(PG: PaymentGateway, Data: {_amount: any, _name: string, _email: string, _phone: string, _note: string}) {
    const auth = btoa(`${PG.key}:${PG.secret}`);

    const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount: parseFloat(Data._amount.toString()) * 100,
            currency: "INR",
            receipt: Data._note,
        }),
    });

    const order = await res.json();

    return order;
}