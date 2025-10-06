"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EventNameLegendProps {
  data: { name: string }[];
}

// Función de ayuda para abreviar (debe ser idéntica a la del gráfico)
const abbreviateName = (name: string) => {
  return name
    .replace("Jantar de", "J.")
    .replace("Almoço de", "A.")
    .replace("Especial de", "E.");
};

export function EventNameLegend({ data }: EventNameLegendProps) {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Legenda dos Eventos</CardTitle>
      </CardHeader>
      <CardContent>
        {/* --- INICIA CAMBIO DE <ol> a <ul> --- */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
          {data.map((item, index) => (
            <li key={index}>
              {/* Añadimos el número (index + 1) manualmente para que coincida con el gráfico */}
              <span className="font-semibold">{`${index}. ${abbreviateName(
                item.name
              )}:`}</span>{" "}
              <span className="text-muted-foreground">{item.name}</span>
            </li>
          ))}
        </ul>
        {/* --- TERMINA CAMBIO DE <ol> a <ul> --- */}
      </CardContent>
    </Card>
  );
}
