"use server";

import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

export const createStripeCheckout = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }

  if (!process.env.STRIPE_PREMIUM_PLAN_PRICE_ID) {
    throw new Error("Stripe price id not found");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",

    metadata: {
      clerk_user_id: userId,
    },

    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },

    success_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID!,
        quantity: 1,
      },
    ],
  });

  return {
    checkoutUrl: session.url,
  };
};
