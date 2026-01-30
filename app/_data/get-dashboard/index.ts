import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "./types";

export const getDashboard = async (month: number) => {
  const now = new Date();
  const year = now.getFullYear();

  const safeMonth =
    typeof month === "number" && month >= 1 && month <= 12
      ? month
      : now.getMonth() + 1;

  const startDate = new Date(year, safeMonth - 1, 1);
  const endDate = new Date(year, safeMonth, 0, 23, 59, 59);
  const where = {
    date: {
      gte: startDate,
      lte: endDate,
    },
  };

  const investmentTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )._sum.amount ?? 0,
  );

  const depositTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )._sum.amount ?? 0,
  );

  const expenseTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )._sum.amount ?? 0,
  );

  const balanceTotal = depositTotal - expenseTotal - investmentTotal;

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount ?? 0,
  );

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expenseTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };
  return {
    investmentTotal,
    depositTotal,
    expenseTotal,
    balanceTotal,
    typesPercentage,
  };
};
