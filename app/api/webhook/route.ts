import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const reqHeaders = await headers(); 
  const signature = reqHeaders.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook Error:", error); // ✅ Added error logging
    return new NextResponse("Webhook error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session.subscription) {
    return new NextResponse("Missing subscription ID", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session.metadata?.orgId) {
      return new NextResponse("Org Id is required", { status: 400 });
    }

    await db.orgSubscription.create({
      data: {
        orgId: session.metadata.orgId,
        stripeCustomerId: subscription.customer as string, // ✅ Fixed customer ID
        stripeSubscriptionId: subscription.id, // ✅ Fixed subscription ID
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000), // ✅ Fixed timestamp conversion
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await db.orgSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000), // ✅ Fixed timestamp conversion
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
