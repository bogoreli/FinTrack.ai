"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-checkout";

const AcquirePlanButton = () => {
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

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adquirir plano
    </Button>
  );
};

export default AcquirePlanButton;
