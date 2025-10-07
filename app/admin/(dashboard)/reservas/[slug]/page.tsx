// app/admin/reservas/[slug]/page.tsx

import { Users, XCircle, CheckCircle2, Banknote, Baby } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server"; // 1. Importa el
import { reservationService } from "@/lib/services"; // 2. Importa tu
import { ReservationsTable } from "./reservations-table";
import { PrintButton } from "./print-button";

// Nuestra función de ayuda para el título
const formatTitleFromSlug = (slug: string): string => {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default async function EventReservationPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const pageTitle = formatTitleFromSlug(slug);

  const supabase = await createClient();

  const data = await reservationService.getReservationsByEventSlug(
    supabase,
    slug
  );

  const summary = {
    totalAdults: data.reduce((sum, res) => sum + res.adults, 0),
    totalChildren7_11: data.reduce((sum, res) => sum + res.children_7_11, 0),
    totalChildren0_6: data.reduce((sum, res) => sum + res.children_0_6, 0),
    totalVerified: data.filter((res) => res.is_verified).length,
    totalUnverified: data.filter((res) => !res.is_verified).length,
    // La nueva lógica: primero filtra, luego suma.
    totalVerifiedAmount: data
      .filter((res) => res.is_verified)
      .reduce((sum, res) => sum + res.total, 0),
  };

  // Creamos un array para generar las cards del resumen dinámicamente
  const summaryCards = [
    { title: "Total Adultos", value: summary.totalAdults, icon: Users },
    { title: "Crianças 7-11", value: summary.totalChildren7_11, icon: Baby },
    { title: "Crianças 0-6", value: summary.totalChildren0_6, icon: Baby },
    {
      title: "Total Verificado",
      value: summary.totalVerified,
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      title: "Não Verificado",
      value: summary.totalUnverified,
      icon: XCircle,
      color: "text-red-600",
    },
    // --- INICIA CAMBIO EN LA DEFINICIÓN DE LA CARD ---
    {
      title: "Receita Verificada", // Título más preciso
      value: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(summary.totalVerifiedAmount), // Usamos el nuevo valor calculado
      icon: Banknote,
      color: "text-green-600", // Le damos color para resaltar que es un ingreso confirmado
    },
    // --- TERMINA CAMBIO EN LA DEFINICIÓN DE LA CARD ---
  ];

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* SECCIÓN 1: Header de Página Mejorado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight pt-6">
            Reservas de {pageTitle}
          </h1>
          <p className="text-sm text-muted-foreground no-print">
            Gerencie as reservas para este evento.
          </p>
        </div>
        <PrintButton />
      </div>

      {/* SECCIÓN 2: Resumen de Reservas como Dashboard de Métricas */}
      <div className="no-print">
        <h2 className="text-xl font-semibold mb-4">Resumo das Reservas</h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {summaryCards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${card.color || ""}`}>
                  {card.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* SECCIÓN 3: Tabla de Datos (sin cambios) */}
      <ReservationsTable data={data} slug={slug} />
    </div>
  );
}
