"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type AuditType =
  | "visita_entrada"
  | "visita_salida"
  | "paquete_recepcion"
  | "paquete_entrega"
  | "paquete_devolucion";

interface AuditRecord {
  id: string;
  tipo: AuditType;
  fecha: string;
  usuario: string;
  departamento: string;
  visitaId?: string;
  paqueteId?: string;
  observaciones?: string;
}

interface AuditTableProps {
  registros?: AuditRecord[];
  onViewDetails?: (id: string) => void;
  isLoading?: boolean;
}

const tipoLabels: Record<AuditType, string> = {
  visita_entrada: "Visita Entrada",
  visita_salida: "Visita Salida",
  paquete_recepcion: "Paquete Recibido",
  paquete_entrega: "Paquete Entregado",
  paquete_devolucion: "Paquete Devuelto",
};

const tipoVariants: Record<AuditType, "default" | "secondary" | "destructive" | "outline"> = {
  visita_entrada: "default",
  visita_salida: "secondary",
  paquete_recepcion: "default",
  paquete_entrega: "secondary",
  paquete_devolucion: "destructive",
};

const mockData: AuditRecord[] = [
  {
    id: "AUD-001",
    tipo: "visita_entrada",
    fecha: "2026-05-02 09:15",
    usuario: "Carlos Mendez",
    departamento: "4B",
    visitaId: "VIS-0847",
    observaciones: "Mensajería, visitante autorizado",
  },
  {
    id: "AUD-002",
    tipo: "paquete_recepcion",
    fecha: "2026-05-02 08:45",
    usuario: "María García",
    departamento: "5A",
    paqueteId: "PKG-2341",
    observaciones: "Amazon, 2 cajas",
  },
  {
    id: "AUD-003",
    tipo: "paquete_entrega",
    fecha: "2026-05-01 16:30",
    usuario: "Juan López",
    departamento: "2C",
    paqueteId: "PKG-2340",
    observaciones: "Recibió residente",
  },
  {
    id: "AUD-004",
    tipo: "visita_salida",
    fecha: "2026-05-01 15:45",
    usuario: "Carlos Mendez",
    departamento: "4B",
    visitaId: "VIS-0846",
    observaciones: "Salida registrada",
  },
  {
    id: "AUD-005",
    tipo: "paquete_recepcion",
    fecha: "2026-05-01 14:20",
    usuario: "Rosa Santos",
    departamento: "3D",
    paqueteId: "PKG-2339",
    observaciones: "Correo Argentino, correspondencia",
  },
  {
    id: "AUD-006",
    tipo: "paquete_devolucion",
    fecha: "2026-05-01 11:00",
    usuario: "María García",
    departamento: "6F",
    paqueteId: "PKG-2338",
    observaciones: "Destinatario mudado",
  },
  {
    id: "AUD-007",
    tipo: "visita_entrada",
    fecha: "2026-04-30 18:30",
    usuario: "Juan López",
    departamento: "1A",
    visitaId: "VIS-0845",
    observaciones: "Reparación de plomería autorizada",
  },
  {
    id: "AUD-008",
    tipo: "paquete_entrega",
    fecha: "2026-04-30 17:15",
    usuario: "Carlos Mendez",
    departamento: "5A",
    paqueteId: "PKG-2337",
    observaciones: "Entregado a residente",
  },
];

export function AuditTable({
  registros = mockData,
  onViewDetails,
  isLoading,
}: AuditTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString.replace(" ", "T"));
    return date.toLocaleDateString("es-AR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-8 text-center">
        <p className="text-sm text-slate-500">Cargando registros...</p>
      </div>
    );
  }

  if (registros.length === 0) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-8 text-center">
        <p className="text-sm text-slate-500">No hay registros de auditoría</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="border-b border-slate-200 hover:bg-slate-50">
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700">
                Tipo
              </TableHead>
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700">
                Fecha
              </TableHead>
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700">
                Usuario
              </TableHead>
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700">
                Depto.
              </TableHead>
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700">
                Referencia
              </TableHead>
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700">
                Observaciones
              </TableHead>
              <TableHead className="h-12 px-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-700">
                Acción
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registros.map((registro) => (
              <TableRow
                key={registro.id}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <TableCell className="px-4 py-3">
                  <Badge variant={tipoVariants[registro.tipo]}>
                    {tipoLabels[registro.tipo]}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-slate-700">
                  {formatDate(registro.fecha)}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-slate-700">
                  {registro.usuario}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm font-medium text-slate-900">
                  {registro.departamento}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-slate-600">
                  {registro.visitaId || registro.paqueteId || "—"}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-slate-600">
                  <span
                    className={cn(
                      "line-clamp-2",
                      !registro.observaciones && "text-slate-400"
                    )}
                  >
                    {registro.observaciones || "Sin observaciones"}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails?.(registro.id)}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
