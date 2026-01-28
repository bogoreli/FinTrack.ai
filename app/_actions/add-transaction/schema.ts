import {
  PaymentMethod,
  TransactionCategory,
  TransactionType,
} from "@prisma/client";
import z from "zod";

export const upsertTransactionSchema = z.object({
  name: z.string().trim().min(1),
  amount: z.number().positive(),
  type: z.enum(
    Object.values(TransactionType) as [TransactionType, ...TransactionType[]],
  ),

  category: z.enum(
    Object.values(TransactionCategory) as [
      TransactionCategory,
      ...TransactionCategory[],
    ],
  ),

  paymentMethod: z.enum(
    Object.values(PaymentMethod) as [PaymentMethod, ...PaymentMethod[]],
  ),

  date: z.date(),
});
