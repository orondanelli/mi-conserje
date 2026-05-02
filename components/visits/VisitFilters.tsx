"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type VisitStatus = "en_edificio" | "salio" | "no_autorizado";

interface VisitFiltersState {
  search?: string;
  department?: string;
  status?: VisitStatus;
  authorized?: boolean;
  dateFrom?: string;
  dateTo?: string;
}

interface VisitFiltersProps {
  onChange?: (filters: VisitFiltersState) => void;
  activeFilters?: VisitFiltersState;
}

const DEPARTMENTS = [
  { id: "4B", label: "4B - Torre A" },
  { id: "4A", label: "4A - Torre A" },
  { id: "5B", label: "5B - Torre A" },
  { id: "5A", label: "5A - Torre B" },
  { id: "6B", label: "6B - Torre B" },
  { id: "6A", label: "6A - Torre B" },
  { id: "7B", label: "7B - Torre C" },
  { id: "7A", label: "7A - Torre C" },
];

export function VisitFilters({ onChange, activeFilters = {} }: VisitFiltersProps) {
  const [filters, setFilters] = useState<VisitFiltersState>(activeFilters);

  const handleChange = (key: keyof VisitFiltersState, value: any) => {
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
      {/* Búsqueda y Departamento */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">Visitante o Documento</label>
          <Input
            placeholder="Buscar..."
            value={filters.search || ""}
            onChange={(e) => handleChange("search", e.target.value)}
            className="h-9 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">Departamento</label>
          <Select value={filters.department || ""} onValueChange={(value) => handleChange("department", value || undefined)}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">Estado</label>
          <Select value={filters.status || ""} onValueChange={(value) => handleChange("status", value || undefined)}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="en_edificio">En edificio</SelectItem>
              <SelectItem value="salio">Salió</SelectItem>
              <SelectItem value="no_autorizado">No autorizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Rango de fechas y Autorización */}
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
          <label className="text-xs font-medium text-slate-700">Autorización</label>
          <Select
            value={filters.authorized === undefined ? "" : String(filters.authorized)}
            onValueChange={(value) => {
              if (value === "") handleChange("authorized", undefined);
              else handleChange("authorized", value === "true");
            }}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="true">Autorizado</SelectItem>
              <SelectItem value="false">No autorizado</SelectItem>
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
