"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Package, CheckCircle2, XCircle, Clock } from "lucide-react";

type PackageStatus = "pendiente" | "entregado" | "devuelto";

interface Paquete {
  id: string;
  numeroGuia?: string;
  empresa: string;
  departamento: {
    numero: string;
    piso: number;
  };
  descripcion?: string;
  fechaRecepcion: string;
  fechaEntrega?: string;
  porteroRecepcion: string;
  porteroEntrega?: string;
  receptorEntrega?: string;
  documentoReceptor?: string;
  observaciones?: string;
  estado: PackageStatus;
  notificado: boolean;
}

interface DeliveryStatusProps {
  paquete: Paquete;
  onStatusUpdate: (
    paqueteId: string,
    nuevoEstado: PackageStatus,
    datos?: {
      receptorEntrega?: string;
      documentoReceptor?: string;
      porteroEntrega?: string;
      observaciones?: string;
    }
  ) => void;
}

const formSchema = z.object({
  nuevoEstado: z.enum(["pendiente", "entregado", "devuelto"]),
  receptorEntrega: z.string().optional(),
  documentoReceptor: z.string().optional(),
  porteroEntrega: z.string().optional(),
  observaciones: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function DeliveryStatus({ paquete, onStatusUpdate }: DeliveryStatusProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nuevoEstado: paquete.estado,
      receptorEntrega: paquete.receptorEntrega || "",
      documentoReceptor: paquete.documentoReceptor || "",
      porteroEntrega: paquete.porteroEntrega || "",
      observaciones: paquete.observaciones || "",
    },
  });

  const nuevoEstado = form.watch("nuevoEstado");

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      onStatusUpdate(paquete.id, data.nuevoEstado, {
        receptorEntrega: data.receptorEntrega,
        documentoReceptor: data.documentoReceptor,
        porteroEntrega: data.porteroEntrega,
        observaciones: data.observaciones,
      });
      setOpen(false);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadgeStyle = (status: PackageStatus) => {
    switch (status) {
      case "entregado":
        return "bg-green-50 text-green-700 border-green-200";
      case "devuelto":
        return "bg-red-50 text-red-700 border-red-200";
      case "pendiente":
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const getStatusIcon = (status: PackageStatus) => {
    switch (status) {
      case "entregado":
        return <CheckCircle2 className="h-4 w-4" />;
      case "devuelto":
        return <XCircle className="h-4 w-4" />;
      case "pendiente":
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: PackageStatus) => {
    switch (status) {
      case "entregado":
        return "Entregado";
      case "devuelto":
        return "Devuelto";
      case "pendiente":
      default:
        return "Pendiente";
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <Badge
          variant="outline"
          className={cn("flex items-center gap-2 px-3 py-1.5", getStatusBadgeStyle(paquete.estado))}
        >
          {getStatusIcon(paquete.estado)}
          {getStatusLabel(paquete.estado)}
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
          className="text-slate-600 hover:text-slate-900"
        >
          Cambiar estado
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-slate-700" />
              Actualizar estado del paquete
            </DialogTitle>
            <DialogDescription className="pt-2">
              <div className="space-y-1 text-sm text-slate-600">
                <p>
                  <strong>Guía:</strong> {paquete.numeroGuia || "N/A"}
                </p>
                <p>
                  <strong>Empresa:</strong> {paquete.empresa}
                </p>
                <p>
                  <strong>Destino:</strong> Depto. {paquete.departamento.numero}{" "}
                  (Piso {paquete.departamento.piso})
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="nuevoEstado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">
                      Nuevo estado *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-slate-200">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="entregado">Entregado</SelectItem>
                        <SelectItem value="devuelto">Devuelto</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {nuevoEstado === "entregado" && (
                <>
                  <FormField
                    control={form.control}
                    name="receptorEntrega"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">
                          Nombre del receptor
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: María Rodríguez"
                            className="border-slate-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="documentoReceptor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">
                          DNI del receptor
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: 12345678"
                            className="border-slate-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="porteroEntrega"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">
                          Portero que entregó
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: Carlos López"
                            className="border-slate-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {(nuevoEstado === "devuelto" || nuevoEstado === "entregado") && (
                <FormField
                  control={form.control}
                  name="observaciones"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">
                        Observaciones
                      </FormLabel>
                      <FormControl>
                        <textarea
                          placeholder={
                            nuevoEstado === "devuelto"
                              ? "Ej: Rechazado por destinatario, datos incorrectos..."
                              : "Ej: Entregado en perfecto estado..."
                          }
                          className="flex min-h-24 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="text-slate-600"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-slate-700 hover:bg-slate-800 text-white"
                >
                  {isSubmitting ? "Guardando..." : "Guardar cambios"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
