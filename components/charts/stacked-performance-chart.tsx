"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface ChartData {
  name: string;
  [key: string]: any;
}

interface StackedPerformanceChartProps {
  data: ChartData[];
  title: string;
  dataKeyVerified: string;
  dataKeyUnverified: string;
  formatAsCurrency?: boolean;
}

const chartConfig = {
  verified: {
    label: "Verificado",
    color: "#02367B",
  },
  unverified: {
    label: "Não Verificado",
    color: "#04BADE",
  },
} satisfies ChartConfig;

export function StackedPerformanceChart({
  data,
  title,
  dataKeyVerified,
  dataKeyUnverified,
  formatAsCurrency = false,
}: StackedPerformanceChartProps) {
  const formattedData = data.map((item, index) => ({
    // Añadimos el número (index + 1) al nombre abreviado
    name: `${index + 1}. ${item.name
      .replace("Jantar de", "J.")
      .replace("Almoço de", "A.")
      .replace("Especial de", "E.")}`,
    verified: item[dataKeyVerified] || 0,
    unverified: item[dataKeyUnverified] || 0,
  }));

  const yAxisFormatter = (value: number) => {
    if (formatAsCurrency) {
      return `R$${(value / 1000).toFixed(0)}k`;
    }
    return value.toString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[350px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formattedData} accessibilityLayer>
                <XAxis /* ... sin cambios ... */ />
                <YAxis
                  tickFormatter={yAxisFormatter} /* ... sin cambios ... */
                />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="dot" />}
                  cursor={{ fill: "hsl(var(--muted))" }}
                />
                <ChartLegend content={<ChartLegendContent />} />

                {/* --- ¡AQUÍ ESTÁ LA CORRECCIÓN! --- */}
                {/* Usamos las claves estáticas "verified" y "unverified" que creamos arriba */}
                <Bar
                  dataKey="verified"
                  stackId="a"
                  fill="var(--color-verified)"
                />
                <Bar
                  dataKey="unverified"
                  stackId="a"
                  fill="var(--color-unverified)"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
