"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { PackageForm, type PackageData } from "@/components/packages/PackageForm";
import { PackageTable } from "@/components/packages/PackageTable";
import { PackageFilters } from "@/components/packages/PackageFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const INITIAL_PACKAGES = [
  {
    id: "PKG-001",
    numeroGuia: "ARG0012345678",
    empresa: "DHL Express",
    departamento: "4B",
    descripcion: "Electrónica - Monitor 24\"",
    fechaRecepcion: "2026-05-02 09:30",
    fechaEntrega: "2026-05-02 14:15",
    porteroRecepcion: "Carlos Mendoza",
    porteroEntrega: "Carlos Mendoza",
    receptorEntrega: "María García",
    documentoReceptor: "DNI 35.123.456",
    observaciones: "",
    estado: "entregado" as const,
    notificado: true,
  },
  {
    id: "PKG-002",
    numeroGuia: "OCA9876543210",
    empresa: "OCA",
    departamento: "7A",
    descripcion: "Ropa y accesorios",
    fechaRecepcion: "2026-05-01 16:45",
    porteroRecepcion: "Jorge López",
    estado: "pendiente" as const,
    notificado: false,
  },
  {
    id: "PKG-003",
    numeroGuia: null,
    empresa: "Correo Argentino",
    departamento: "2D",
    descripcion: "Documentación",
    fechaRecepcion: "2026-04-30 11:20",
    fechaEntrega: "2026-05-01 10:00",
    porteroRecepcion: "Ana Rodríguez",
    porteroEntrega: "Ana Rodríguez",
    receptorEntrega: "Roberto Silva",
    documentoReceptor: "DNI 28.456.789",
    estado: "entregado" as const,
    notificado: true,
  },
  {
    id: "PKG-004",
    numeroGuia: "FED1122334455",
    empresa: "FedEx",
    departamento: "5C",
    descripcion: "Equipamiento de oficina",
    fechaRecepcion: "2026-04-28 13:10",
    fechaEntrega: "2026-04-28 15:30",
    porteroRecepcion: "Carlos Mendoza",
    porteroEntrega: "Carlos Mendoza",
    receptorEntrega: "Patricia González",
    documentoReceptor: "DNI 29.987.654",
    observaciones: "Cliente no disponible, dejado en conserjería",
    estado: "devuelto" as const,
    notificado: true,
  },
  {
    id: "PKG-005",
    numeroGuia: "SUP5544332211",
    empresa: "SuperVía",
    departamento: "8F",
    descripcion: "Libros y material educativo",
    fechaRecepcion: "2026-05-02 08:00",
    porteroRecepcion: "Jorge López",
    estado: "pendiente" as const,
    notificado: true,
  },
];

type PackageFiltersState = {
  search?: string;
  empresa?: string;
  estado?: "pendiente" | "entregado" | "devuelto";
  dateFrom?: string;
  dateTo?: string;
  notificado?: boolean;
};

export default function PaquetesPage() {
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [filters, setFilters] = useState<PackageFiltersState>({});
  const [activeTab, setActiveTab] = useState("listado");

  const handleAddPackageReception = async (data: PackageData) => {
    const newPackage = {
      id: `PKG-${String(packages.length + 1).padStart(3, "0")}`,
      numeroGuia: data.numeroGuia || null,
      empresa: data.empresa,
      departamento: data.departamento,
      descripcion: data.descripcion,
      fechaRecepcion: data.fechaRecepcion,
      porteroRecepcion: data.porteroRecepcion,
      estado: data.estado as "pendiente" | "entregado" | "devuelto",
      notificado: data.notificado,
      observaciones: data.observaciones,
    };

    setPackages([newPackage, ...packages]);
    setActiveTab("listado");
  };

  const handleAddPackageDelivery = async (data: PackageData) => {
    const newPackage = {
      id: `PKG-${String(packages.length + 1).padStart(3, "0")}`,
      numeroGuia: data.numeroGuia || null,
      empresa: data.empresa,
      departamento: data.departamento,
      descripcion: data.descripcion,
      fechaRecepcion: data.fechaRecepcion,
      fechaEntrega: data.fechaEntrega,
      porteroRecepcion: data.porteroRecepcion,
      porteroEntrega: data.porteroEntrega,
      receptorEntrega: data.receptorEntrega,
      documentoReceptor: data.documentoReceptor,
      estado: data.estado as "pendiente" | "entregado" | "devuelto",
      notificado: data.notificado,
      observaciones: data.observaciones,
    };

    setPackages([newPackage, ...packages]);
    setActiveTab("listado");
  };

  const handleStatusChange = (packageId: string, newStatus: "pendiente" | "entregado" | "devuelto") => {
    setPackages(
      packages.map((pkg) =>
        pkg.id === packageId
          ? { ...pkg, estado: newStatus }
          : pkg
      )
    );
  };

  const filteredPackages = packages.filter((pkg) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (
        !(pkg.numeroGuia?.toLowerCase().includes(searchLower) || false) &&
        !pkg.descripcion?.toLowerCase().includes(searchLower) &&
        !pkg.empresa.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }
    if (filters.empresa && pkg.empresa !== filters.empresa) {
      return false;
    }
    if (filters.estado && pkg.estado !== filters.estado) {
      return false;
    }
    if (filters.notificado !== undefined && pkg.notificado !== filters.notificado) {
      return false;
    }
    return true;
  });

  const stats = {
    total: packages.length,
    pendientes: packages.filter((p) => p.estado === "pendiente").length,
    entregados: packages.filter((p) => p.estado === "entregado").length,
    devueltos: packages.filter((p) => p.estado === "devuelto").length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        title="Control de Paquetes"
        subtitle="Gestiona la recepción y entrega de paquetes"
      />

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="p-4 border-slate-200">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Total de paquetes</p>
                <p className="text-3xl font-semibold text-slate-900">{stats.total}</p>
              </div>
            </Card>
            <Card className="p-4 border-slate-200">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Pendientes</p>
                <p className="text-3xl font-semibold text-amber-600">{stats.pendientes}</p>
              </div>
            </Card>
            <Card className="p-4 border-slate-200">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Entregados</p>
                <p className="text-3xl font-semibold text-green-600">{stats.entregados}</p>
              </div>
            </Card>
            <Card className="p-4 border-slate-200">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Devueltos</p>
                <p className="text-3xl font-semibold text-red-600">{stats.devueltos}</p>
              </div>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl">
              <TabsTrigger value="listado">Listado de paquetes</TabsTrigger>
              <TabsTrigger value="recepcion">Registrar recepción</TabsTrigger>
              <TabsTrigger value="entrega">Registrar entrega</TabsTrigger>
            </TabsList>

            {/* Listado Tab */}
            <TabsContent value="listado" className="space-y-6 mt-0">
              <section>
                <PackageFilters onChange={setFilters} activeFilters={filters} />
              </section>

              <section>
                <PackageTable paquetes={filteredPackages} onStatusChange={handleStatusChange} />
              </section>
            </TabsContent>

            {/* Recepción Tab */}
            <TabsContent value="recepcion" className="mt-0">
              <div className="flex items-center justify-center py-8">
                <PackageForm mode="reception" onSubmit={handleAddPackageReception} />
              </div>
            </TabsContent>

            {/* Entrega Tab */}
            <TabsContent value="entrega" className="mt-0">
              <div className="flex items-center justify-center py-8">
                <PackageForm mode="delivery" onSubmit={handleAddPackageDelivery} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
