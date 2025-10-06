import { createClient } from "@/lib/supabase/server";
import { EventsPerformanceChart } from "@/components/charts/events-performance-charts";
import { GuestBreakdownChart } from "@/components/charts/guest-breakdown-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Banknote, CalendarCheck } from "lucide-react";
import { StackedPerformanceChart } from "@/components/charts/stacked-performance-chart";
import { EventNameLegend } from "@/components/charts/event-name-legend";

// Forzamos el renderizado dinámico ya que depende de datos que cambian
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: dashboardData, error } = await supabase.rpc(
    "get_overall_dashboard_data_v2"
  );

  if (error) {
    console.error("Error fetching overall dashboard data:", error);
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">
          Erro ao carregar os dados do dashboard.
        </h1>
      </div>
    );
  }

  // 2. Prepara los datos para cada gráfico
  const eventsPerformanceData = dashboardData?.eventsPerformance || [];
  const guestBreakdownData = dashboardData?.overallGuestBreakdown;

  // 1. Receita Verificada: Suma solo los ingresos verificados de cada evento.
  const totalVerifiedRevenue = eventsPerformanceData.reduce(
    (sum: number, event: { verifiedRevenue: number }) =>
      sum + (event.verifiedRevenue || 0),
    0
  );

  // 2. Reservas Totais: Suma tanto las verificadas como las no verificadas.
  const totalReservations = eventsPerformanceData.reduce(
    (sum: number, event: { verifiedCount: number; unverifiedCount: number }) =>
      sum + (event.verifiedCount || 0) + (event.unverifiedCount || 0),
    0
  );

  return (
    <div className="p-4 md:p-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Geral</h1>

      {/* Tarjetas de Resumen General */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalVerifiedRevenue)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Reservas Totais
            </CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalReservations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Hóspedes Totais
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {guestBreakdownData
                ? guestBreakdownData.adults +
                  guestBreakdownData.children_7_11 +
                  guestBreakdownData.children_0_6
                : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sección de Gráficos */}
      <div className="grid gap-4 grid-cols-2">
        <StackedPerformanceChart
          title="Receita por Evento (Verificado vs. Não Verificado)"
          data={eventsPerformanceData}
          dataKeyVerified="verifiedRevenue"
          dataKeyUnverified="unverifiedRevenue"
          formatAsCurrency
        />
        <StackedPerformanceChart
          title="Reservas por Evento (Verificado vs. Não Verificado)"
          data={eventsPerformanceData}
          dataKeyVerified="verifiedCount"
          dataKeyUnverified="unverifiedCount"
        />
        {/* 2. Añadimos el componente de leyenda aquí, que aplica a ambos gráficos */}
        <EventNameLegend data={eventsPerformanceData} />
      </div>

      {/* Sección de Distribución de Huéspedes */}
      <div className="grid gap-4">
        {guestBreakdownData && (
          <div className="max-w-md mx-auto w-full">
            {" "}
            {/* Contenedor para centrar y limitar el ancho del donut */}
            <GuestBreakdownChart data={guestBreakdownData} />
          </div>
        )}
      </div>
    </div>
  );
}
