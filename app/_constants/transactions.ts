import {
  PaymentMethod,
  TransactionCategory,
  TransactionType,
} from "@prisma/client";

export const TRANSACTION_CATEGORY_LABELS = {
  EDUCATION: "Educação",
  ENTERTAINMENT: "Entretenimento",
  FOOD: "Alimentação",
  HEALTH: "Saúde",
  HOUSING: "Moradia",
  OTHER: "Outros",
  SALARY: "Salário",
  TRANSPORTATION: "Transporte",
  UTILITY: "Contas e Serviços",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  PIX: "Pix",
  BANK_TRANSFER: "Transferência Bancária",
  OTHER: "Outros",
  BANK_SLIP: "Boleto Bancário",
};

export const TRANSACTION_TYPE_OPTIONS = [
  { label: "Depósito", value: TransactionType.DEPOSIT },
  { label: "Despesa", value: TransactionType.EXPENSE },
  { label: "Investimento", value: TransactionType.INVESTMENT },
];

export const PAYMENT_METHOD_OPTIONS = [
  { label: "Dinheiro", value: PaymentMethod.CASH },
  { label: "Cartão de Crédito", value: PaymentMethod.CREDIT_CARD },
  { label: "Cartão de Débito", value: PaymentMethod.DEBIT_CARD },
  { label: "Pix", value: PaymentMethod.PIX },
  { label: "Transferência Bancária", value: PaymentMethod.BANK_TRANSFER },
  { label: "Outros", value: PaymentMethod.OTHER },
  { label: "Boleto Bancário", value: PaymentMethod.BANK_SLIP },
];

export const TRANSACTION_CATEGORY_OPTIONS = [
  { label: "Educação", value: TransactionCategory.EDUCATION },
  { label: "Entretenimento", value: TransactionCategory.ENTERTAINMENT },
  { label: "Alimentação", value: TransactionCategory.FOOD },
  { label: "Saúde", value: TransactionCategory.HEALTH },
  { label: "Moradia", value: TransactionCategory.HOUSING },
  { label: "Outros", value: TransactionCategory.OTHER },
  { label: "Salário", value: TransactionCategory.SALARY },
  { label: "Transporte", value: TransactionCategory.TRANSPORTATION },
  { label: "Contas e Serviços", value: TransactionCategory.UTILITY },
];
