"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/_components/ui/chart";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import PercentageItem from "./percentage-item";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TransactionType = "DEPOSIT" | "EXPENSE" | "INVESTMENT";

const chartConfig = {
  INVESTMENT: {
    label: "Investido",
    color: "#FFFFFF",
  },
  DEPOSIT: {
    label: "Receita",
    color: "#55B02E",
  },
  EXPENSE: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionsPieChartsProps {
  investmentTotal: number;
  depositTotal: number;
  expenseTotal: number;
  typesPercentage: TransactionPercentagePerType;
}

const TransactionsPieCharts = ({
  investmentTotal,
  depositTotal,
  expenseTotal,
  typesPercentage,
}: TransactionsPieChartsProps) => {
  const chartData = [
    {
      type: "DEPOSIT" as const,
      amount: depositTotal,
      fill: "#55B02E",
    },
    {
      type: "EXPENSE" as const,
      amount: expenseTotal,
      fill: "#E93030",
    },
    {
      type: "INVESTMENT" as const,
      amount: investmentTotal,
      fill: "#FFFFFF",
    },
  ];

  return (
    <Card className="flex flex-col p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            value={typesPercentage.DEPOSIT}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Despesas"
            value={typesPercentage.EXPENSE}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} className="text-white" />}
            title="Investimento"
            value={typesPercentage.INVESTMENT}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsPieCharts;
