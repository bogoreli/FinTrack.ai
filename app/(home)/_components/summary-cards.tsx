import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
  month: number; // 1 a 12
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const now = new Date();
  const year = now.getFullYear();

  // valida mês corretamente (1–12)
  const safeMonth =
    typeof month === "number" && month >= 1 && month <= 12
      ? month
      : now.getMonth() + 1;

  // converte para padrão JS (0–11)
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

  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balanceTotal}
        size="large"
      />
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investimento"
          amount={investmentTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={expenseTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
