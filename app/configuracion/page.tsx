import type { Metadata } from "next";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/layout/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Building2Icon, BellIcon, ShieldIcon, UsersIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Configuración | Mi Conserje",
  description: "Ajustes generales del sistema de control de acceso y paquetes",
};

const sections = [
  {
    title: "Edificio",
    description: "Datos del edificio, pisos y departamentos registrados",
    icon: Building2Icon,
    status: "Activo",
  },
  {
    title: "Notificaciones",
    description: "Alertas de paquetes pendientes y visitas sin salida registrada",
    icon: BellIcon,
    status: "Activo",
  },
  {
    title: "Usuarios y porteros",
    description: "Gestión de cuentas de porteros y administradores del sistema",
    icon: UsersIcon,
    status: "Activo",
  },
  {
    title: "Seguridad",
    description: "Políticas de acceso, auditoría y retención de registros",
    icon: ShieldIcon,
    status: "Activo",
  },
];

export default function ConfiguracionPage() {
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
          title="Configuración"
          subtitle="Ajustes generales del sistema"
          userName="Orlando Rondanelli"
          userEmail="orlando.rondanelliortiz@cencosud.cl"
          userInitials="OR"
        />
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Inicio</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Configuración</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <Card key={section.title} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-start gap-3 pb-2">
                      <div className="rounded-lg bg-slate-100 p-2">
                        <Icon className="h-5 w-5 text-slate-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{section.title}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {section.status}
                          </Badge>
                        </div>
                        <CardDescription className="mt-1 text-sm">
                          {section.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-slate-500">
                        Configuración disponible en próxima versión
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
