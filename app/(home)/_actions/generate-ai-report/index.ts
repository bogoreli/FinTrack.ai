"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { startOfMonth, endOfMonth } from "date-fns";
import OpenAI from "openai";
import { GenerateAiReportInputSchema, generateAiReportSchema } from "./schema";

export const generateAiReport = async ({
  month,
}: GenerateAiReportInputSchema) => {
  generateAiReportSchema.parse({ month });
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await (await clerkClient()).users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  if (!hasPremiumPlan) {
    throw new Error("You need a premium plan to generate AI reports");
  }

  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (transactions.length === 0) {
    return "Nenhuma transação encontrada neste mês.";
  }

  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`;
  const completion = await openAi.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
      },
      {
        role: "user",
        content,
      },
    ],
  });
  // pegar o relatório gerado pelo ChatGPT e retornar para o usuário
  return completion.choices[0].message.content;
};
