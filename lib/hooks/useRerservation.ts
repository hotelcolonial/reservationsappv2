// lib/hooks/useReservations.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSupabase } from "../supabase/supabaseProvider";
import { Reservation } from "@/lib/types";
import { reservationService } from "../services";

export function useReservations(eventSlug?: string) {
  const { supabase } = useSupabase();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReservations = useCallback(async () => {
    if (!eventSlug || !supabase) return;

    try {
      setLoading(true);
      setError(null);
      const data = await reservationService.getReservationsByEventSlug(
        supabase,
        eventSlug
      );
      setReservations(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Falha ao carregar as reservas."
      );
    } finally {
      setLoading(false);
    }
  }, [eventSlug, supabase]);

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  async function createReservation(
    newReservationData: Omit<Reservation, "id" | "createdAt" | "updatedAt">
  ): Promise<void> {
    // <-- Ahora no devuelve nada (void)
    if (!supabase) throw new Error("Cliente Supabase não disponível.");

    try {
      // Simplemente llamamos a la función. Ya no devuelve la reserva creada.
      await reservationService.createReservation(supabase, newReservationData);

      // Opcional: Si quieres que la lista se actualice después de crear,
      // puedes llamar a loadReservations() aquí.
      // await loadReservations();
    } catch (err) {
      // Propagamos el error para que el componente que llama lo maneje.
      throw err;
    }
  }

  // --- FUNCIÓN CORREGIDA ---
  async function createReservationsForEvents(
    reservationDetails: Omit<
      Reservation,
      "id" | "createdAt" | "updatedAt" | "event_type_id" | "total"
    >,
    selectedMeals: { slug: string; price: number }[]
  ): Promise<void> {
    // <-- Ahora no devuelve nada (void)
    if (!supabase) throw new Error("Cliente Supabase não disponível.");

    const reservationPromises = selectedMeals.map((meal) => {
      const mealTotal =
        meal.price * reservationDetails.adults +
        meal.price * reservationDetails.children_7_11 * 0.6;

      const detailsWithTotal = {
        ...reservationDetails,
        total: mealTotal,
      };

      return reservationService.createReservationForEvent(
        supabase!,
        meal.slug,
        detailsWithTotal
      );
    });

    // Esperamos a que todas las promesas de inserción se completen.
    await Promise.all(reservationPromises);

    // Ya no hay nada que devolver, la función simplemente termina con éxito.
  }

  return {
    reservations,
    loading,
    error,
    createReservation,
    createReservationsForEvents,
    refreshReservations: loadReservations,
  };
}
