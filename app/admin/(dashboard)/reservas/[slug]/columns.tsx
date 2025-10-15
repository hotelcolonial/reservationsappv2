// app/admin/reservas/[slug]/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Reservation } from "@/lib/types"; // Importa el tipo que definimos
import { EditableLocatorCell } from "./editable-locator-cell";
import { VerificationCell } from "./verification-cell";
import { ActionsCell } from "./actions-cell";

// Esta es la definición de nuestras columnas
export const getColumns = (eventSlug: string): ColumnDef<Reservation>[] => [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "adults",
    header: "Adultos",
  },
  {
    accessorKey: "children_0_6",
    header: "Crianças 0 a 6",
  },
  {
    accessorKey: "children_7_11",
    header: "Crianças 7 a 11",
  },
  {
    accessorKey: "total",
    header: "Total",
    // Formateamos el total como moneda
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "locator",
    header: "Localizador",
    // --- INICIA CAMBIO EN LA CELDA ---
    // 3. Renderiza nuestro nuevo componente interactivo
    cell: ({ row }) => {
      return (
        <EditableLocatorCell reservation={row.original} eventSlug={eventSlug} />
      );
    },
  },
  {
    id: "verification",
    header: "Verificação",
    // Renderizamos un Botón en la celda
    cell: ({ row }) => {
      return (
        <VerificationCell reservation={row.original} eventSlug={eventSlug} />
      );
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <ActionsCell reservation={row.original} eventSlug={eventSlug} />
    ),
  },
];
