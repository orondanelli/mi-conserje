"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type PackageStatus = "pendiente" | "entregado" | "devuelto";

interface PackageFiltersState {
  search?: string;
  empresa?: string;
  estado?: PackageStatus;
  dateFrom?: string;
  dateTo?: string;
  notificado?: boolean;
}

interface PackageFiltersProps {
  onChange?: (filters: PackageFiltersState) => void;
  activeFilters?: PackageFiltersState;
}

const EMPRESAS = [
  { id: "dhl", label: "DHL Express" },
  { id: "fedex", label: "FedEx" },
  { id: "correo", label: "Correo Argentino" },
  { id: "mercado", label: "Mercado Envíos" },
  { id: "oca", label: "OCA" },
  { id: "andreani", label: "Andreani" },
  { id: "urgente", label: "Urgente 24" },
  { id: "tba", label: "TBA Logística" },
];

export function PackageFilters({ onChange, activeFilters = {} }: PackageFiltersProps) {
  const [filters, setFilters] = useState<PackageFiltersState>(activeFilters);

  const handleChange = (key: keyof PackageFiltersState, value: any) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    onChange?.(newFilters);
  };

  const handleReset = () => {
    setFilters({});
    onChange?.({});
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined && v !== "");

  return (
    <div className="space-y-4 rounded-sm border border-slate-200 bg-slate-50 p-4">
      {/* Búsqueda, Empresa y Estado */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">Guía o Descripción</label>
          <Input
            placeholder="Buscar..."
            value={filters.search || ""}
            onChange={(e) => handleChange("search", e.target.value)}
            className="h-9 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">Empresa</label>
          <Select value={filters.empresa || ""} onValueChange={(value) => handleChange("empresa", value || undefined)}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas</SelectItem>
              {EMPRESAS.map((empresa) => (
                <SelectItem key={empresa.id} value={empresa.id}>
                  {empresa.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">Estado</label>
          <Select value={filters.estado || ""} onValueChange={(value) => handleChange("estado", value || undefined)}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="entregado">Entregado</SelectItem>
              <SelectItem value="devuelto">Devuelto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Rango de fechas y Notificación */}
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">Desde</label>
          <Input
            type="date"
            value={filters.dateFrom || ""}
            onChange={(e) => handleChange("dateFrom", e.target.value)}
            className="h-9 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">Hasta</label>
          <Input
            type="date"
            value={filters.dateTo || ""}
            onChange={(e) => handleChange("dateTo", e.target.value)}
            className="h-9 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">Notificado</label>
          <Select
            value={filters.notificado === undefined ? "" : String(filters.notificado)}
            onValueChange={(value) => {
              if (value === "") handleChange("notificado", undefined);
              else handleChange("notificado", value === "true");
            }}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="true">Notificado</SelectItem>
              <SelectItem value="false">No notificado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Botón Limpiar */}
        <div className="flex items-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={!hasActiveFilters}
            className={cn(
              "h-9 w-full text-sm font-medium",
              !hasActiveFilters && "opacity-50 cursor-not-allowed"
            )}
          >
            Limpiar
          </Button>
        </div>
      </div>
    </div>
  );
}
