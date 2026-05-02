"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface AuditFiltersProps {
  onChange?: (filters: AuditFilterValues) => void
}

export interface AuditFilterValues {
  tipo?: string
  fechaDesde?: string
  fechaHasta?: string
  usuario?: string
  departamento?: string
  observaciones?: string
}

const TIPO_EVENTOS = [
  { value: "visita_entrada", label: "Entrada de Visita" },
  { value: "visita_salida", label: "Salida de Visita" },
  { value: "paquete_recepcion", label: "Recepción de Paquete" },
  { value: "paquete_entrega", label: "Entrega de Paquete" },
  { value: "paquete_devolucion", label: "Devolución de Paquete" },
]

const DEPARTAMENTOS = [
  { value: "101", label: "Depto 101" },
  { value: "102", label: "Depto 102" },
  { value: "201", label: "Depto 201" },
  { value: "202", label: "Depto 202" },
  { value: "301", label: "Depto 301" },
  { value: "302", label: "Depto 302" },
]

export function AuditFilters({ onChange }: AuditFiltersProps) {
  const [filters, setFilters] = useState<AuditFilterValues>({})

  const handleFilterChange = (newFilters: AuditFilterValues) => {
    setFilters(newFilters)
    onChange?.(newFilters)
  }

  const handleInputChange = (
    field: keyof AuditFilterValues,
    value: string
  ) => {
    const newFilters = { ...filters, [field]: value || undefined }
    handleFilterChange(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({})
    onChange?.({})
  }

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined && v !== "")

  return (
    <div className="flex flex-col gap-4 rounded-md border border-input bg-card p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Filtros Avanzados</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-8 px-2 text-xs"
          >
            <X className="mr-1 h-3 w-3" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Filters Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Tipo de Evento */}
        <div className="flex flex-col gap-2">
          <label htmlFor="tipo" className="text-xs font-medium text-foreground">
            Tipo de Evento
          </label>
          <Select
            value={filters.tipo || ""}
            onValueChange={(value) => handleInputChange("tipo", value)}
          >
            <SelectTrigger id="tipo" className="h-9">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              {TIPO_EVENTOS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Departamento */}
        <div className="flex flex-col gap-2">
          <label htmlFor="departamento" className="text-xs font-medium text-foreground">
            Departamento
          </label>
          <Select
            value={filters.departamento || ""}
            onValueChange={(value) => handleInputChange("departamento", value)}
          >
            <SelectTrigger id="departamento" className="h-9">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              {DEPARTAMENTOS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Usuario/Portero */}
        <div className="flex flex-col gap-2">
          <label htmlFor="usuario" className="text-xs font-medium text-foreground">
            Usuario
          </label>
          <Input
            id="usuario"
            type="text"
            placeholder="Nombre del portero"
            value={filters.usuario || ""}
            onChange={(e) => handleInputChange("usuario", e.target.value)}
            className="h-9"
          />
        </div>

        {/* Fecha Desde */}
        <div className="flex flex-col gap-2">
          <label htmlFor="fechaDesde" className="text-xs font-medium text-foreground">
            Desde
          </label>
          <Input
            id="fechaDesde"
            type="date"
            value={filters.fechaDesde || ""}
            onChange={(e) => handleInputChange("fechaDesde", e.target.value)}
            className="h-9"
          />
        </div>

        {/* Fecha Hasta */}
        <div className="flex flex-col gap-2">
          <label htmlFor="fechaHasta" className="text-xs font-medium text-foreground">
            Hasta
          </label>
          <Input
            id="fechaHasta"
            type="date"
            value={filters.fechaHasta || ""}
            onChange={(e) => handleInputChange("fechaHasta", e.target.value)}
            className="h-9"
          />
        </div>

        {/* Observaciones */}
        <div className="flex flex-col gap-2">
          <label htmlFor="observaciones" className="text-xs font-medium text-foreground">
            Observaciones
          </label>
          <Input
            id="observaciones"
            type="text"
            placeholder="Buscar en observaciones"
            value={filters.observaciones || ""}
            onChange={(e) => handleInputChange("observaciones", e.target.value)}
            className="h-9"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 border-t border-input pt-3">
          {filters.tipo && (
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs">
              <span className="font-medium">
                {TIPO_EVENTOS.find((e) => e.value === filters.tipo)?.label}
              </span>
              <button
                onClick={() => handleInputChange("tipo", "")}
                className="ml-1 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
          )}
          {filters.departamento && (
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs">
              <span className="font-medium">
                {DEPARTAMENTOS.find((d) => d.value === filters.departamento)?.label}
              </span>
              <button
                onClick={() => handleInputChange("departamento", "")}
                className="ml-1 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
          )}
          {filters.usuario && (
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs">
              <span className="font-medium">Usuario: {filters.usuario}</span>
              <button
                onClick={() => handleInputChange("usuario", "")}
                className="ml-1 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
          )}
          {filters.fechaDesde && (
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs">
              <span className="font-medium">Desde: {filters.fechaDesde}</span>
              <button
                onClick={() => handleInputChange("fechaDesde", "")}
                className="ml-1 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
          )}
          {filters.fechaHasta && (
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs">
              <span className="font-medium">Hasta: {filters.fechaHasta}</span>
              <button
                onClick={() => handleInputChange("fechaHasta", "")}
                className="ml-1 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
          )}
          {filters.observaciones && (
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs">
              <span className="font-medium">Obs: {filters.observaciones}</span>
              <button
                onClick={() => handleInputChange("observaciones", "")}
                className="ml-1 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
