import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    return NextResponse.error();
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }

  const body = await request.text();
  const stripe = new Stripe(stripeSecretKey);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed", error);
    return NextResponse.error();
  }

  console.log("EVENT RECEIVED:", event.type);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const clerkUserId = session.metadata?.clerk_user_id;

      if (!clerkUserId) {
        console.error("clerk_user_id not found in session metadata");
        break;
      }

      const clerk = await clerkClient();

      await clerk.users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });

      console.log("Subscription activated for user:", clerkUserId);
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;

      if (subscription.status !== "canceled") {
        break;
      }

      const clerkUserId = subscription.metadata?.clerk_user_id;

      if (!clerkUserId) {
        console.error("clerk_user_id not found in subscription metadata");
        break;
      }

      const clerk = await clerkClient();

      await clerk.users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: "free",
        },
      });

      console.log("Subscription canceled (updated) for user:", clerkUserId);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const clerkUserId = subscription.metadata?.clerk_user_id;

      if (!clerkUserId) {
        console.error("clerk_user_id not found in subscription metadata");
        break;
      }

      const clerk = await clerkClient();

      await clerk.users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: "free",
        },
      });

      console.log("Subscription deleted for user:", clerkUserId);
      break;
    }
  }

  return NextResponse.json({ received: true });
};
