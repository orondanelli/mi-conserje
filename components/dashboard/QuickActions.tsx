"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, PackagePlus } from "lucide-react";

interface QuickActionsProps {
  visitRoute?: string;
  packageRoute?: string;
}

export function QuickActions({
  visitRoute = "/visitas",
  packageRoute = "/paquetes",
}: QuickActionsProps) {
  const actions = [
    {
      id: "register-visit",
      label: "Registrar Visita",
      description: "Registrar entrada de visitante",
      icon: UserPlus,
      href: visitRoute,
      variant: "default" as const,
    },
    {
      id: "receive-package",
      label: "Recibir Paquete",
      description: "Registrar paquete recibido",
      icon: PackagePlus,
      href: packageRoute,
      variant: "default" as const,
    },
  ];

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-900">
          Acciones Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.id} href={action.href}>
                <Button
                  variant={action.variant}
                  className="h-auto w-full flex-col items-start gap-2 py-4 px-4 justify-start"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <span className="font-semibold text-sm">
                      {action.label}
                    </span>
                  </div>
                  <span className="text-xs font-normal opacity-90">
                    {action.description}
                  </span>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
