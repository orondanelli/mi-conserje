import { DeliveryStatus } from "./DeliveryStatus";

// Ejemplo de uso del componente DeliveryStatus
export function DeliveryStatusExample() {
  const paquete = {
    id: "PKG-001",
    numeroGuia: "FDX-2024-5678901",
    empresa: "FedEx",
    departamento: {
      numero: "4B",
      piso: 4,
    },
    descripcion: "Electrónica - Monitor LG 27 pulgadas",
    fechaRecepcion: "2026-05-01T10:30:00",
    estado: "pendiente" as const,
    porteroRecepcion: "Juan Martínez",
    notificado: true,
  };

  const handleStatusUpdate = (
    paqueteId: string,
    nuevoEstado: "pendiente" | "entregado" | "devuelto",
    datos?: {
      receptorEntrega?: string;
      documentoReceptor?: string;
      porteroEntrega?: string;
      observaciones?: string;
    }
  ) => {
    console.log("Paquete actualizado:", {
      paqueteId,
      nuevoEstado,
      ...datos,
    });

    // Aquí iría la llamada a la API para actualizar el paquete
  };

  return <DeliveryStatus paquete={paquete} onStatusUpdate={handleStatusUpdate} />;
}
