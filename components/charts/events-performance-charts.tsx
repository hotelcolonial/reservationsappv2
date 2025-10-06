"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// --- INICIAN CAMBIOS ---
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig, // Importa el tipo de configuración
} from "@/components/ui/chart";
// --- TERMINAN CAMBIOS ---

interface ChartData {
  name: string;
  [key: string]: any; // Permite cualquier clave de datos
}

interface EventsPerformanceChartProps {
  data: ChartData[];
  title: string;
  dataKey: string;
  formatAsCurrency?: boolean;
}

export function EventsPerformanceChart({
  data,
  title,
  dataKey,
  formatAsCurrency = false,
}: EventsPerformanceChartProps) {
  const formattedData = data.map((item) => ({
    name: item.name.replace("Jantar de", "J.").replace("Almoço de", "A."),
    [dataKey]: item[dataKey],
  }));

  // --- INICIA NUEVO CÓDIGO ---
  // Define la configuración del gráfico. Es necesaria para el ChartContainer.
  const chartConfig = {
    [dataKey]: {
      label: title,
      color: "hsl(var(--primary))", // Usa el color primario de tu tema
    },
  } satisfies ChartConfig;
  // --- TERMINA NUEVO CÓDIGO ---

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {/* --- INICIA EL WRAPPER --- */}
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formattedData} accessibilityLayer>
                <XAxis /* ... */ />
                <YAxis /* ... */ />
                <Tooltip
                  content={<ChartTooltipContent hideLabel />}
                  cursor={false}
                />
                <Bar dataKey={dataKey} fill="var(--color-bar)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          {/* --- TERMINA EL WRAPPER --- */}
        </div>
      </CardContent>
    </Card>
  );
}
