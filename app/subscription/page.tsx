import { auth, clerkClient } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";

const Subscription = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const user = await (await clerkClient()).users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan == "premium";

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center space-y-6 p-6">
        <h1 className="text-2xl font-bold">Assinaturas</h1>

        <div className="flex flex-wrap justify-center gap-6">
          <Card className="w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
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
            <CardHeader className="relative border-b border-solid py-8">
              {hasPremiumPlan && (
                <Badge className="absolute left-4 top-4 bg-primary/50">
                  Ativo
                </Badge>
              )}
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
