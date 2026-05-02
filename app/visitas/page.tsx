"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { VisitForm, type VisitData } from "@/components/visits/VisitForm";
import { VisitTable } from "@/components/visits/VisitTable";
import { VisitFilters } from "@/components/visits/VisitFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

// Mock data for initial visits
const INITIAL_VISITAS = [
  {
    id: "V001",
    visitante: "María Fernández López",
    documento: "12345678A",
    departamento: "4B",
    piso: 4,
    fechaEntrada: new Date(Date.now() - 3600000),
    estado: "en_edificio" as const,
    autorizado: true,
    portero: "Carlos Mendoza",
    motivo: "Visita personal",
  },
  {
    id: "V002",
    visitante: "Juan Rodríguez García",
    documento: "87654321B",
    departamento: "2A",
    piso: 2,
    fechaEntrada: new Date(Date.now() - 7200000),
    fechaSalida: new Date(Date.now() - 3600000),
    estado: "salio" as const,
    autorizado: true,
    portero: "Pedro Sánchez",
    motivo: "Reparación",
  },
  {
    id: "V003",
    visitante: "Ana Martínez Ruiz",
    documento: "45678901C",
    departamento: "6C",
    piso: 6,
    fechaEntrada: new Date(Date.now() - 1800000),
    estado: "en_edificio" as const,
    autorizado: true,
    portero: "Carlos Mendoza",
    motivo: "Entrega de paquete",
  },
  {
    id: "V004",
    visitante: "Roberto López Gómez",
    documento: "23456789D",
    departamento: "3D",
    piso: 3,
    fechaEntrada: new Date(Date.now() - 86400000),
    fechaSalida: new Date(Date.now() - 82800000),
    estado: "salio" as const,
    autorizado: true,
    portero: "María López García",
  },
  {
    id: "V005",
    visitante: "Luis Gómez Hernández",
    documento: "56789012E",
    departamento: "1A",
    piso: 1,
    fechaEntrada: new Date(Date.now() - 1200000),
    estado: "no_autorizado" as const,
    autorizado: false,
    portero: "Juan García Rodríguez",
  },
];

type VisitFiltersState = {
  search?: string;
  department?: string;
  status?: "en_edificio" | "salio" | "no_autorizado";
  authorized?: boolean;
  dateFrom?: string;
  dateTo?: string;
};

export default function VisitasPage() {
  const [visitas, setVisitas] = useState(INITIAL_VISITAS);
  const [filters, setFilters] = useState<VisitFiltersState>({});
  const [activeTab, setActiveTab] = useState("listado");

  const handleAddVisit = async (data: VisitData) => {
    const newVisita = {
      id: `V${String(visitas.length + 1).padStart(3, "0")}`,
      visitante: data.visitante,
      documento: data.documento,
      departamento: data.departamento,
      piso: parseInt(data.departamento) ? Math.ceil(parseInt(data.departamento) / 100) : 1,
      fechaEntrada: new Date(data.fechaEntrada),
      ...(data.fechaSalida && { fechaSalida: new Date(data.fechaSalida) }),
      estado: data.estado as "en_edificio" | "salio" | "no_autorizado",
      autorizado: data.autorizado,
      portero: data.portero,
      motivo: data.motivo,
    };

    setVisitas([newVisita, ...visitas]);
    setActiveTab("listado");
  };

  const handleCheckOut = (id: string) => {
    setVisitas(
      visitas.map((v) =>
        v.id === id
          ? { ...v, estado: "salio" as const, fechaSalida: new Date() }
          : v
      )
    );
  };

  const filteredVisitas = visitas.filter((visita) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (
        !visita.visitante.toLowerCase().includes(searchLower) &&
        !visita.documento.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }
    if (filters.department && visita.departamento !== filters.department) {
      return false;
    }
    if (filters.status && visita.estado !== filters.status) {
      return false;
    }
    if (filters.authorized !== undefined && visita.autorizado !== filters.authorized) {
      return false;
    }
    return true;
  });

  const stats = {
    total: visitas.length,
    enEdificio: visitas.filter((v) => v.estado === "en_edificio").length,
    salieron: visitas.filter((v) => v.estado === "salio").length,
    noAutorizados: visitas.filter((v) => !v.autorizado).length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        title="Registro de Visitas"
        subtitle="Administra y consulta todas las visitas al edificio"
      />

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="p-4 border-slate-200">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Total de visitas</p>
                <p className="text-3xl font-semibold text-slate-900">{stats.total}</p>
              </div>
            </Card>
            <Card className="p-4 border-slate-200">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">En el edificio</p>
                <p className="text-3xl font-semibold text-slate-900">{stats.enEdificio}</p>
              </div>
            </Card>
            <Card className="p-4 border-slate-200">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Salidas registradas</p>
                <p className="text-3xl font-semibold text-slate-900">{stats.salieron}</p>
              </div>
            </Card>
            <Card className="p-4 border-slate-200">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">No autorizadas</p>
                <p className="text-3xl font-semibold text-slate-900">{stats.noAutorizados}</p>
              </div>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="listado">Listado de visitas</TabsTrigger>
              <TabsTrigger value="registrar">Registrar nueva</TabsTrigger>
            </TabsList>

            {/* Listado Tab */}
            <TabsContent value="listado" className="space-y-6 mt-0">
              <section>
                <VisitFilters onChange={setFilters} activeFilters={filters} />
              </section>

              <section>
                <VisitTable visitas={filteredVisitas} onCheckOut={handleCheckOut} />
              </section>
            </TabsContent>

            {/* Registrar Tab */}
            <TabsContent value="registrar" className="mt-0">
              <div className="flex items-center justify-center">
                <VisitForm onSubmit={handleAddVisit} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
