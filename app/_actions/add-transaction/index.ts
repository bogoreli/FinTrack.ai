"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import {
  PaymentMethod,
  TransactionCategory,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface AddTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: PaymentMethod;
  date: Date;
}
export const upsertTransaction = async (params: AddTransactionParams) => {
  upsertTransactionSchema.parse(params);

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await (await clerkClient()).users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  if (!params.id && !hasPremiumPlan) {
    const transactionCount = await db.transaction.count({
      where: { userId },
    });

    const FREE_LIMIT = 10;

    if (transactionCount >= FREE_LIMIT) {
      throw new Error(
        "Você atingiu o limite do plano gratuito. Faça upgrade para continuar.",
      );
    }
  }

  await db.transaction.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: { id: params.id ?? "" },
  });

  revalidatePath("/transactions");
};
