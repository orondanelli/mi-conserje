"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, Sheet, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActiveFilters {
  dateRange?: { from: Date; to: Date };
  tipo?: string;
  usuario?: string;
  departamento?: string;
  [key: string]: unknown;
}

interface ExportActionsProps {
  filters: ActiveFilters;
  onExport: (format: "pdf" | "excel" | "csv") => void | Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ExportActions({
  filters,
  onExport,
  isLoading = false,
  disabled = false,
}: ExportActionsProps) {
  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== null && v !== ""
  ).length;

  const handleExport = async (format: "pdf" | "excel" | "csv") => {
    await onExport(format);
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            disabled={isLoading || disabled}
            className={cn(
              "gap-2",
              activeFilterCount > 0 && "border-slate-300 bg-slate-50"
            )}
          >
            <Download className="h-4 w-4" />
            Exportar
            {activeFilterCount > 0 && (
              <span className="ml-1 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="text-xs font-semibold text-slate-500">
            Formato de exportación
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleExport("pdf")}
            disabled={isLoading}
            className="gap-2 cursor-pointer"
          >
            <FileText className="h-4 w-4 text-red-600" />
            <span>PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleExport("excel")}
            disabled={isLoading}
            className="gap-2 cursor-pointer"
          >
            <Sheet className="h-4 w-4 text-green-600" />
            <span>Excel</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleExport("csv")}
            disabled={isLoading}
            className="gap-2 cursor-pointer"
          >
            <File className="h-4 w-4 text-blue-600" />
            <span>CSV</span>
          </DropdownMenuItem>
          {activeFilterCount > 0 && (
            <>
              <DropdownMenuSeparator />
              <div className="px-2 py-2 text-xs text-slate-500">
                <p className="font-medium mb-1">Filtros activos:</p>
                <ul className="space-y-0.5">
                  {filters.dateRange && (
                    <li>• Rango de fechas</li>
                  )}
                  {filters.tipo && <li>• Tipo: {filters.tipo}</li>}
                  {filters.usuario && (
                    <li>• Usuario: {filters.usuario}</li>
                  )}
                  {filters.departamento && (
                    <li>• Depto: {filters.departamento}</li>
                  )}
                </ul>
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
