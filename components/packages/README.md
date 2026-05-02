# PackageForm Component

Formulario completo para registrar recepción y entrega de paquetes en el sistema de conserje.

## Características

- **Dos modos de operación**: recepción y entrega
- **Validación integrada**: campos requeridos con mensajes de error
- **Estados visuales**: idle, loading, success, error
- **Datos realistas**: empresas de envío reales, porteros, departamentos
- **TypeScript strict**: interfaces bien tipadas
- **Responsive**: diseño mobile-first con Tailwind
- **Accesibilidad**: labels correctamente asociadas con inputs

## Uso

### Modo Recepción

```tsx
import { PackageForm } from "@/components/packages";

export function ReceivePackagePage() {
  const handleSubmit = async (data) => {
    // Guardar datos de recepción
    await api.packages.receive(data);
  };

  return (
    <PackageForm 
      mode="reception" 
      onSubmit={handleSubmit} 
    />
  );
}
```

### Modo Entrega

```tsx
import { PackageForm } from "@/components/packages";

export function DeliverPackagePage() {
  const handleSubmit = async (data) => {
    // Guardar datos de entrega
    await api.packages.deliver(data);
  };

  return (
    <PackageForm 
      mode="delivery" 
      onSubmit={handleSubmit} 
    />
  );
}
```

### Con Datos Iniciales

```tsx
<PackageForm
  mode="reception"
  onSubmit={handleSubmit}
  initialData={{
    numeroGuia: "1234567890AB",
    empresa: "DHL Express",
    departamento: "101",
    descripcion: "Paquete con electrónica",
  }}
/>
```

## Props

```typescript
interface PackageFormProps {
  mode: "reception" | "delivery";
  onSubmit: (data: PackageData) => void | Promise<void>;
  initialData?: Partial<PackageData>;
}
```

## Tipos

```typescript
interface PackageData {
  numeroGuia?: string;
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
```

## Campos por Modo

### Recepción
- Número de guía (opcional)
- Empresa (requerido)
- Departamento (requerido)
- Descripción (opcional)
- Fecha/hora de recepción (requerido)
- Portero que recibe (requerido)
- ¿Se notificó al departamento? (checkbox)
- Observaciones (opcional)

### Entrega
- Número de guía (opcional)
- Empresa (requerido)
- Departamento (requerido)
- Descripción (opcional)
- Fecha/hora de entrega (requerido)
- Portero que entrega (requerido)
- Receptor del paquete (requerido)
- Documento del receptor (opcional)
- Observaciones (opcional)

## Estados del Paquete

- `pendiente`: Recibido pero aún no entregado
- `entregado`: Entregado al departamento
- `devuelto`: Devuelto al remitente

## Design System

- **Colores**: Paleta slate (neutral)
- **Tipografía**: Inter Tight (display), Inter (body)
- **Border radius**: 0.375rem
- **Dark mode**: No soportado
