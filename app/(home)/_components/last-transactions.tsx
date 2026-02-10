import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { formatCurrency } from "@/app/_utils/currency";
import { TransactionType } from "@prisma/client";
import Link from "next/link";

interface LastTransactionsProps {
  transactions: {
    id: string;
    name: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: Date;
  }[];
}

const LastTransactions = ({ transactions }: LastTransactionsProps) => {
  return (
    <ScrollArea className="h-full rounded-md border">
      <CardHeader>
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {transactions.map((transaction) => (
          <Link
            key={transaction.id}
            href="/transactions"
            className="flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-bold">{transaction.name}</p>
              <p className="text-sm text-muted-foreground">
                {transaction.date.toLocaleDateString("pt-BR")}
              </p>
            </div>

            <p
              className={`text-sm font-bold ${
                transaction.type === TransactionType.EXPENSE
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {formatCurrency(Number(transaction.amount))}
            </p>
          </Link>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
