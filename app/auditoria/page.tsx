"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/layout/Header";
import { AuditTable } from "@/components/audit/AuditTable";
import { AuditFilters, type AuditFilterValues } from "@/components/audit/AuditFilters";
import { ExportActions } from "@/components/audit/ExportActions";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AlertCircle, Archive } from "lucide-react";

export default function AuditoriaPage() {
  const [filters, setFilters] = useState({});
  const [isExporting, setIsExporting] = useState(false);

  const handleFilterChange = (newFilters: AuditFilterValues) => {
    setFilters(newFilters);
  };

  const handleExport = async (format: "pdf" | "excel" | "csv") => {
    setIsExporting(true);
    try {
      // Simulamos un delay de exportación
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(`Exportando como ${format}...`);
      // Aquí irá la lógica real de exportación
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Header
          title="Auditoría"
          subtitle="Historial completo de eventos para revisión y trazabilidad"
          userName="Orlando Rondanelli"
          userEmail="orlando.rondanelliortiz@cencosud.cl"
          userInitials="OR"
        />
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
            {/* Info Banner */}
            <section className="flex items-start gap-3 rounded-lg border border-slate-200 bg-blue-50 p-4">
              <div className="flex-shrink-0 pt-0.5">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-blue-900">
                  Auditoría inmutable
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Este registro contiene todos los eventos del sistema: entradas y salidas de visitas, recepciones y entregas de paquetes. Los datos son inmutables para garantizar la trazabilidad completa.
                </p>
              </div>
            </section>

            {/* Filters Section */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <Archive className="h-5 w-5 text-slate-700" />
                <h2 className="text-lg font-semibold text-slate-900">
                  Filtros Avanzados
                </h2>
              </div>
              <AuditFilters onChange={handleFilterChange} />
            </section>

            {/* Export Section */}
            <section className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Exportar registros
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Descarga los registros de auditoría en tu formato preferido
                </p>
              </div>
              <ExportActions
                filters={filters}
                onExport={handleExport}
                isLoading={isExporting}
              />
            </section>

            {/* Results Section */}
            <section>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Registros de Auditoría
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Total de eventos registrados en el sistema
                </p>
              </div>
              <AuditTable
                isLoading={false}
                onViewDetails={(id) => {
                  console.log(`Ver detalles de ${id}`);
                }}
              />
            </section>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
