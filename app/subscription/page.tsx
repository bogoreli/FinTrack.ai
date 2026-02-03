import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan-button";

const Subscription = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  return (
    <div>
      <Navbar />
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Assinaturas</h1>

        <div className="flex gap-6">
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">R$</span>
                  <span className="text-6xl font-semibold">0</span>
                  <span className="text-2xl text-muted-foreground">/mês</span>
                </div>
              </h2>
            </CardHeader>
            <CardContent className="space-y-5 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Apenas 5 transações por dia (4/5)</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon className="text-white" />
                <p>Apenas 100mb de armazenamento</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon className="text-white" />
                <p>Relatória de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              <h2 className="text-center text-2xl font-semibold">
                Plano Pro
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">R$</span>
                  <span className="text-6xl font-semibold">20</span>
                  <span className="text-2xl text-muted-foreground">/mês</span>
                </div>
              </h2>
            </CardHeader>
            <CardContent className="space-y-5 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Armazenamento ilimitado</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios de IA ilimitados</p>
              </div>
              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
