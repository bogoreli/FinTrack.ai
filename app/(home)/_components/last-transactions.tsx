import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { formatCurrency } from "@/app/_utils/currency";
import Link from "next/link";

type TransactionType = "DEPOSIT" | "INVESTMENT" | "EXPENSE";

interface LastTransaction {
  id: string;
  name: string;
  amount: number;
  type: TransactionType;
  date: Date;
}

interface LastTransactionsProps {
  transactions: LastTransaction[];
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
                transaction.type === "EXPENSE"
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
