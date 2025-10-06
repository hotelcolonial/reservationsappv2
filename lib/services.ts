// lib/services/reservation.service.ts

import { SupabaseClient } from "@supabase/supabase-js";
import { Reservation } from "@/lib/types"; // Importa tus modelos

export const reservationService = {
  async getReservationsByEventSlug(
    supabase: SupabaseClient,
    eventSlug: string
  ): Promise<Reservation[]> {
    // Paso 1: Obtener el ID del evento a partir de su slug.
    const { data: eventType, error: eventError } = await supabase
      .from("event_types")
      .select("id")
      .eq("slug", eventSlug)
      .single();

    // Si el evento no se encuentra o hay un error, devolvemos un array vacío.
    if (eventError || !eventType) {
      console.error(
        "Error fetching event type or event not found:",
        eventError
      );
      return [];
    }

    // Paso 2: Obtener todas las reservas que coincidan con el ID del evento.
    const { data: reservations, error: reservationError } = await supabase
      .from("reservations")
      .select("*")
      .eq("event_type_id", eventType.id)
      .order("created_at", { ascending: false });

    if (reservationError) {
      console.error("Error fetching reservations:", reservationError);
      throw reservationError;
    }

    return reservations || [];
  },

  /**
   * Obtiene una única reserva por su ID.
   * @param supabase - La instancia del cliente de Supabase.
   * @param reservationId - El UUID de la reserva que se quiere obtener.
   * @returns Una promesa que resuelve al objeto de la reserva.
   */
  async getReservationById(
    supabase: SupabaseClient,
    reservationId: string
  ): Promise<Reservation> {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("id", reservationId)
      .single();

    if (error) {
      console.error("Error fetching reservation by ID:", error);
      throw error;
    }
    return data;
  },

  /**
   * Crea una nueva reserva en la base de datos.
   * @param supabase - La instancia del cliente de Supabase.
   * @param newReservation - Un objeto con los datos de la nueva reserva.
   *                         No debe incluir 'id', 'createdAt' ni 'updatedAt'.
   * @returns Una promesa que resuelve a la reserva recién creada.
   */
  async createReservation(
    supabase: SupabaseClient,
    newReservation: Omit<Reservation, "id" | "createdAt" | "updatedAt">
  ): Promise<Reservation> {
    const { data, error } = await supabase
      .from("reservations")
      .insert(newReservation)
      .select()
      .single();

    if (error) {
      console.error("Error creating reservation:", error);
      throw error;
    }
    return data;
  },

  async createReservationForEvent(
    supabase: SupabaseClient,
    eventSlug: string,
    reservationDetails: Omit<
      Reservation,
      "id" | "createdAt" | "updatedAt" | "event_type_id"
    >
  ): Promise<Reservation> {
    const { data: eventType, error: eventError } = await supabase
      .from("event_types")
      .select("id")
      .eq("slug", eventSlug)
      .single();

    if (eventError || !eventType) {
      console.error(
        `Error: Evento com slug "${eventSlug}" não foi encontrado.`,
        eventError
      );
      throw new Error(`Evento com slug "${eventSlug}" não foi encontrado.`);
    }

    const newReservationData = {
      ...reservationDetails,
      event_type_id: eventType.id, // Añadimos el ID del evento encontrado.
    };

    return this.createReservation(supabase, newReservationData);
  },
  // --- FIN DE LA NUEVA FUNCIÓN ---

  /**
   * Actualiza una reserva existente.
   * @param supabase - La instancia del cliente de Supabase.
   * @param reservationId - El UUID de la reserva a actualizar.
   * @param updates - Un objeto con los campos que se quieren actualizar.
   * @returns Una promesa que resuelve a la reserva actualizada.
   */
  async updateReservation(
    supabase: SupabaseClient,
    reservationId: string,
    updates: Partial<Omit<Reservation, "id" | "createdAt" | "updatedAt">>
  ): Promise<Reservation> {
    const { data, error } = await supabase
      .from("reservations")
      .update(updates)
      .eq("id", reservationId)
      .select()
      .single();

    if (error) {
      console.error("Error updating reservation:", error);
      throw error;
    }
    return data;
  },

  /**
   * Elimina una reserva de la base de datos.
   * @param supabase - La instancia del cliente de Supabase.
   * @param reservationId - El UUID de la reserva a eliminar.
   * @returns Una promesa que se resuelve cuando la operación termina.
   */
  async deleteReservation(
    supabase: SupabaseClient,
    reservationId: string
  ): Promise<void> {
    const { error } = await supabase
      .from("reservations")
      .delete()
      .eq("id", reservationId);

    if (error) {
      console.error("Error deleting reservation:", error);
      throw error;
    }
  },
};
