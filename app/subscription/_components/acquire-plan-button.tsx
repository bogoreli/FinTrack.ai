"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-checkout";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AcquirePlanButton = () => {
  const { user } = useUser();
  const handleAcquirePlanClick = async () => {
    try {
      const { checkoutUrl } = await createStripeCheckout();

      if (!checkoutUrl) {
        throw new Error("Checkout URL not found");
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Erro ao iniciar checkout:", error);
      alert("Não foi possível iniciar o checkout.");
    }
  };

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan == "premium";

  if (hasPremiumPlan) {
    return (
      <Button className="w-full rounded-full font-bold" variant="link">
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIKE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar Plano
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adquirir Plano
    </Button>
  );
};

export default AcquirePlanButton;
