"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Check, X, RotateCcw } from "lucide-react";

interface Package {
  id: string;
  numeroGuia: string | null;
  empresa: string;
  departamento: string;
  descripcion?: string;
  fechaRecepcion: string;
  fechaEntrega?: string;
  porteroRecepcion: string;
  porteroEntrega?: string;
  receptorEntrega?: string;
  documentoReceptor?: string;
  observaciones?: string;
  estado: "pendiente" | "entregado" | "devuelto";
  notificado: boolean;
}

interface PackageTableProps {
  paquetes?: Package[];
  onStatusChange: (packageId: string, newStatus: "pendiente" | "entregado" | "devuelto") => void;
}

const statusConfig = {
  pendiente: {
    label: "Pendiente",
    badge: "bg-amber-100 text-amber-800 border-amber-300",
  },
  entregado: {
    label: "Entregado",
    badge: "bg-green-100 text-green-800 border-green-300",
  },
  devuelto: {
    label: "Devuelto",
    badge: "bg-red-100 text-red-800 border-red-300",
  },
};

const mockPackages: Package[] = [
  {
    id: "PKG-001",
    numeroGuia: "ARG0012345678",
    empresa: "DHL",
    departamento: "4B",
    descripcion: "Electrónica - Monitor 24\"",
    fechaRecepcion: "2026-05-02 09:30",
    fechaEntrega: "2026-05-02 14:15",
    porteroRecepcion: "Carlos Mendez",
    porteroEntrega: "Carlos Mendez",
    receptorEntrega: "María García",
    documentoReceptor: "DNI 35.123.456",
    estado: "entregado",
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
    estado: "pendiente",
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
    estado: "entregado",
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
    porteroRecepcion: "Carlos Mendez",
    porteroEntrega: "Carlos Mendez",
    receptorEntrega: "Patricia González",
    documentoReceptor: "DNI 29.987.654",
    observaciones: "Cliente no disponible, dejado en conserjería",
    estado: "devuelto",
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
    estado: "pendiente",
    notificado: true,
  },
  {
    id: "PKG-006",
    numeroGuia: "TBA6677889900",
    empresa: "TBA Logística",
    departamento: "3G",
    descripcion: "Accesorios para hogar",
    fechaRecepcion: "2026-04-29 10:30",
    fechaEntrega: "2026-04-29 16:45",
    porteroRecepcion: "Ana Rodríguez",
    porteroEntrega: "Ana Rodríguez",
    receptorEntrega: "Felipe Martínez",
    documentoReceptor: "DNI 32.123.456",
    estado: "entregado",
    notificado: true,
  },
];

export function PackageTable({ paquetes = mockPackages, onStatusChange }: PackageTableProps) {
  const isEmpty = !paquetes || paquetes.length === 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isEmpty) {
    return (
      <div className="border border-slate-200 rounded-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="font-semibold text-slate-900">Guía</TableHead>
              <TableHead className="font-semibold text-slate-900">Empresa</TableHead>
              <TableHead className="font-semibold text-slate-900">Depto</TableHead>
              <TableHead className="font-semibold text-slate-900">Recepción</TableHead>
              <TableHead className="font-semibold text-slate-900">Entrega</TableHead>
              <TableHead className="font-semibold text-slate-900">Estado</TableHead>
              <TableHead className="font-semibold text-slate-900">Notificado</TableHead>
              <TableHead className="font-semibold text-slate-900">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <p className="text-slate-500 text-sm">
                  No hay paquetes registrados
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto border border-slate-200 rounded-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="font-semibold text-slate-900">Guía</TableHead>
            <TableHead className="font-semibold text-slate-900">Empresa</TableHead>
            <TableHead className="font-semibold text-slate-900">Depto</TableHead>
            <TableHead className="font-semibold text-slate-900">Recepción</TableHead>
            <TableHead className="font-semibold text-slate-900">Entrega</TableHead>
            <TableHead className="font-semibold text-slate-900">Estado</TableHead>
            <TableHead className="font-semibold text-slate-900">Notificado</TableHead>
            <TableHead className="font-semibold text-slate-900">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paquetes.map((pkg) => {
            const statusInfo = statusConfig[pkg.estado];

            return (
              <TableRow key={pkg.id} className="hover:bg-slate-50">
                <TableCell className="text-sm font-mono text-slate-700">
                  {pkg.numeroGuia || "—"}
                </TableCell>
                <TableCell className="text-sm text-slate-900">{pkg.empresa}</TableCell>
                <TableCell className="text-sm font-semibold text-slate-900">
                  {pkg.departamento}
                </TableCell>
                <TableCell className="text-sm text-slate-600">
                  {formatDate(pkg.fechaRecepcion)}
                </TableCell>
                <TableCell className="text-sm text-slate-600">
                  {pkg.fechaEntrega ? formatDate(pkg.fechaEntrega) : "—"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("text-xs font-medium", statusInfo.badge)}
                  >
                    {statusInfo.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {pkg.notificado ? (
                    <div className="flex items-center gap-1 text-green-700">
                      <Check className="w-4 h-4" />
                      <span className="text-xs font-medium">Sí</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-amber-700">
                      <X className="w-4 h-4" />
                      <span className="text-xs font-medium">No</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-slate-100"
                      >
                        <MoreHorizontal className="h-4 w-4 text-slate-500" />
                        <span className="sr-only">Abrir menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        onClick={() => onStatusChange(pkg.id, "pendiente")}
                      >
                        Marcar Pendiente
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onStatusChange(pkg.id, "entregado")}
                      >
                        Marcar Entregado
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onStatusChange(pkg.id, "devuelto")}
                      >
                        Marcar Devuelto
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
