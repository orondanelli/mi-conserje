"use client";

import { useState } from "react";
import { PackageForm, type PackageData } from "@/components/packages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PackageFormExample() {
  const [lastSubmission, setLastSubmission] = useState<PackageData | null>(null);

  const handleReceptionSubmit = async (data: PackageData) => {
    console.log("Reception data:", data);
    setLastSubmission(data);
    // En una aplicación real, aquí harías un fetch a tu API
    // await fetch('/api/packages/reception', { method: 'POST', body: JSON.stringify(data) })
  };

  const handleDeliverySubmit = async (data: PackageData) => {
    console.log("Delivery data:", data);
    setLastSubmission(data);
    // En una aplicación real, aquí harías un fetch a tu API
    // await fetch('/api/packages/delivery', { method: 'POST', body: JSON.stringify(data) })
  };

  return (
    <div className="space-y-6 p-6">
      <Tabs defaultValue="reception" className="w-full">
        <TabsList className="border-b border-slate-200">
          <TabsTrigger value="reception">Recepción de Paquete</TabsTrigger>
          <TabsTrigger value="delivery">Entrega de Paquete</TabsTrigger>
        </TabsList>

        <TabsContent value="reception" className="space-y-6">
          <PackageForm
            mode="reception"
            onSubmit={handleReceptionSubmit}
          />
        </TabsContent>

        <TabsContent value="delivery" className="space-y-6">
          <PackageForm
            mode="delivery"
            onSubmit={handleDeliverySubmit}
          />
        </TabsContent>
      </Tabs>

      {lastSubmission && (
        <Card className="border-slate-200">
          <CardHeader className="border-b border-slate-200 bg-slate-50">
            <CardTitle className="text-base font-semibold text-slate-900">
              Último registro enviado
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <pre className="overflow-auto rounded bg-slate-100 p-4 text-sm">
              {JSON.stringify(lastSubmission, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
