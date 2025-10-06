"use client";

import { Reservation } from "@/lib/types";
import { getColumns } from "./columns"; // Importa la función de columnas
import { DataTable } from "./data-table"; // Importa la tabla

interface ReservationsTableProps {
  data: Reservation[];
  slug: string;
}

export function ReservationsTable({ data, slug }: ReservationsTableProps) {
  // 2. La llamada a getColumns() ahora ocurre de forma segura en el cliente.
  const columns = getColumns(slug);

  // 3. Este componente ahora es el responsable de renderizar la tabla con las columnas correctas.
  return <DataTable columns={columns} data={data} />;
}
