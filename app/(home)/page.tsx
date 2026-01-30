import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-selected";

interface HomeProps {
  searchParams: {
    month?: string;
  };
}

const Home = async ({ searchParams }: HomeProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const currentMonth = new Date().getMonth() + 1; // 1 a 12

  const month =
    typeof searchParams.month === "string"
      ? Number(searchParams.month)
      : currentMonth;

  const monthIsInvalid = Number.isNaN(month) || month < 1 || month > 12;

  if (monthIsInvalid) {
    redirect(`/?month=${currentMonth}`);
  }

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <SummaryCards month={month} />
      </div>
    </>
  );
};

export default Home;
