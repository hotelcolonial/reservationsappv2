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
  ) {
    if (!supabase) throw new Error("Cliente Supabase não disponível.");

    try {
      const createdReservation = await reservationService.createReservation(
        supabase,
        newReservationData
      );

      setReservations((prev) => [createdReservation, ...prev]);
      return createdReservation;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Falha ao criar a reserva."
      );
    }
  }

  async function createReservationsForEvents(
    reservationDetails: Omit<
      Reservation,
      "id" | "createdAt" | "updatedAt" | "event_type_id" | "total"
    >,
    selectedMeals: { slug: string; price: number }[]
  ): Promise<Reservation[]> {
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

    const createdReservations = await Promise.all(reservationPromises);
    return createdReservations;
  }

  /* async function updateReservation(
    reservationId: string,
    updates: Partial<Omit<Reservation, "id" | "createdAt" | "updatedAt">>
  ) {
    if (!supabase) throw new Error("Cliente Supabase não disponível.");

    try {
      const updatedReservation = await reservationService.updateReservation(
        supabase,
        reservationId,
        updates
      );

      setReservations((prev) =>
        prev.map((r) => (r.id === reservationId ? updatedReservation : r))
      );
      return updatedReservation;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Falha ao atualizar a reserva."
      );
    }
  } */

  /*   async function deleteReservation(reservationId: string) {
    if (!supabase) throw new Error("Cliente Supabase não disponível.");

    try {
      await reservationService.deleteReservation(supabase, reservationId);
      // Elimina la reserva del array del estado
      setReservations((prev) => prev.filter((r) => r.id !== reservationId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Falha ao deletar a reserva."
      );
    }
  } */

  return {
    reservations,
    loading,
    error,
    createReservation,
    /*     updateReservation, */
    /*     deleteReservation, */
    createReservationsForEvents,
    refreshReservations: loadReservations,
  };
}
