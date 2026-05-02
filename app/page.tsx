import type { Metadata } from "next";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/layout/Header";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Dashboard | mi-conserje",
  description:
    "Vista principal del sistema con resumen diario de visitas, paquetes y actividad reciente",
};

export default function Dashboard() {
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
          title="Dashboard"
          subtitle="Resumen diario del edificio"
          userName="Orlando Rondanelli"
          userEmail="orlando.rondanelliortiz@cencosud.cl"
          userInitials="OR"
        />
        <main className="flex-1 overflow-auto">
          <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
            {/* Estadísticas principales */}
            <section>
              <DashboardStats
                visitasHoy={12}
                paquetesPendientes={5}
                paquetesEntregadosHoy={8}
                totalMensual={247}
                tasaAutorizacion={95}
              />
            </section>

            {/* Acciones rápidas y actividad reciente */}
            <section className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              {/* Columna izquierda - Acciones rápidas */}
              <div className="lg:col-span-1">
                <QuickActions
                  visitRoute="/visitas"
                  packageRoute="/paquetes"
                />
              </div>

              {/* Columna derecha - Actividad reciente */}
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>
            </section>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
