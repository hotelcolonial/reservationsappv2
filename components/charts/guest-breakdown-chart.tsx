"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Label } from "../ui/label";

interface ChartData {
  adults: number;
  children_7_11: number;
  children_0_6: number;
}

// Colores consistentes para cada categoría
const COLORS = {
  adults: "#16a34a", // Verde
  children_7_11: "#f97316", // Naranja
  children_0_6: "#3b82f6", // Azul
};

export function GuestBreakdownChart({ data }: { data: ChartData }) {
  // Transforma el objeto de datos en un array para el gráfico,
  // y filtra las categorías que no tienen huéspedes para no saturar el gráfico.
  const chartData = [
    { name: "Adultos", value: data.adults, fill: COLORS.adults },
    {
      name: "Crianças (7-11)",
      value: data.children_7_11,
      fill: COLORS.children_7_11,
    },
    {
      name: "Crianças (0-6)",
      value: data.children_0_6,
      fill: COLORS.children_0_6,
    },
  ].filter((item) => item.value > 0);

  const chartConfig = Object.fromEntries(
    chartData.map((item) => [item.name, { label: item.name, color: item.fill }])
  ) satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição Geral de Hóspedes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full aspect-square max-h-[350px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  // 4. Radios en Porcentaje: El gráfico ahora escala con el contenedor
                  innerRadius="60%"
                  outerRadius="90%"
                  paddingAngle={5}
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={entry.fill}
                      stroke={entry.fill}
                    />
                  ))}

                  {/* 5. Etiqueta Central: Muestra el total de forma clara y limpia */}
                  {/* Remove the Label component here, and render the central label as a custom overlay below */}
                </Pie>
                <Legend
                  content={({ payload }) => {
                    return (
                      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-xs">
                        {payload?.map((entry, index) => (
                          <li
                            key={`item-${index}`}
                            className="flex items-center gap-2"
                          >
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            {entry.value}
                          </li>
                        ))}
                      </ul>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
