// export const dynamic = "force-dynamic";

// import { auth, clerkClient } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import Navbar from "../_components/navbar";
// import SummaryCards from "./_components/summary-cards";
// import TimeSelect from "./_components/time-selected";
// import TransactionsPieCharts from "./_components/transactions-pie-charts";
// import { getDashboard } from "../_data/get-dashboard";
// import ExpensesPerCategory from "./_components/expenses-per-category";
// import LastTransactions from "./_components/last-transactions";
// import { canUserAddTransaction } from "../_data/can-user-add-transaction";
// import AiReportButton from "./_components/ai-report-button";

// interface HomeProps {
//   searchParams: {
//     month?: string;
//   };
// }

// const Home = async ({ searchParams }: HomeProps) => {
//   const { userId } = await auth();

//   if (!userId) {
//     redirect("/login");
//   }

//   const currentMonth = new Date().getMonth() + 1; // 1 a 12

//   const month =
//     typeof searchParams.month === "string"
//       ? Number(searchParams.month)
//       : currentMonth;

//   const monthIsInvalid = Number.isNaN(month) || month < 1 || month > 12;

//   const dashboard = await getDashboard(month);

//   const userCanAddTransaction = await canUserAddTransaction();

//   const user = await (await clerkClient()).users.getUser(userId);

//   if (monthIsInvalid) {
//     redirect(`/?month=${currentMonth}`);
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col space-y-6 overflow-hidden p-6">
//         <div className="flex justify-between">
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//           <div className="flex items-center gap-3">
//             <AiReportButton
//               month={month.toString()}
//               hasPremiumPlan={
//                 user.publicMetadata.subscriptionPlan === "premium"
//               }
//             />
//             <TimeSelect />
//           </div>
//         </div>
//         <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden">
//           <div className="flex flex-col gap-6 overflow-hidden">
//             <SummaryCards
//               month={month}
//               {...dashboard}
//               userCanAddTransaction={userCanAddTransaction}
//             />
//             <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
//               <TransactionsPieCharts {...dashboard} />
//               <ExpensesPerCategory
//                 expensesPerCategory={dashboard.totalExpensePerCategory}
//               />
//             </div>
//           </div>
//           <LastTransactions lastTransactions={dashboard.lastTransactions} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

const Home = async () => {
  return <div>Build test</div>;
};

export default Home;
