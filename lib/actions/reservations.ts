// lib/actions/reservations.ts
"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache"; // <- Importa revalidatePath

// ... (tu función getReservationsByEventSlug existente) ...

// --- INICIA NUEVA FUNCIÓN ---
export async function updateReservationLocator(
  reservationId: number,
  locator: string,
  eventSlug: string // <- Necesitamos el slug para la revalidación
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reservations")
    .update({ locator: locator, updated_at: new Date().toISOString() }) // Actualiza el localizador y la fecha
    .eq("id", reservationId)
    .select()
    .single();

  if (error) {
    console.error("Error updating locator:", error.message);
    return { success: false, error: error.message };
  }

  // ¡Magia de Next.js! Esto le dice a Next que los datos de esta página han cambiado
  // y que debe volver a obtenerlos la próxima vez que se visite.
  revalidatePath(`/admin/reservas/${eventSlug}`);

  return { success: true, data };
}
// --- FIN DE LA NUEVA FUNCIÓN ---

export async function verifyReservation(
  reservationId: number,
  eventSlug: string
) {
  const supabase = await createClient();

  // 1. Actualiza la reserva
  const { data: updatedReservation, error } = await supabase
    .from("reservations")
    .update({ is_verified: true, updated_at: new Date().toISOString() })
    .eq("id", reservationId)
    .select(`*, event_types ( name )`) // 2. ¡Obtén el nombre del evento al mismo tiempo!
    .single();

  if (error) {
    console.error("Error verifying reservation:", error.message);
    return { success: false, error: error.message };
  }

  // --- INICIA LÓGICA DE ENVÍO DE EMAIL ---
  if (updatedReservation) {
    // 3. Prepara el payload para la API de email
    const emailPayload = {
      reservation: updatedReservation,
      eventName:
        updatedReservation.event_types?.name || "Nosso Evento Especial", // Extrae el nombre del evento
    };

    // 4. Llama a tu API Route para enviar el email.
    // Usamos la URL absoluta que debe estar en tus variables de entorno.
    const emailApiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verification`;
    console.log("Intentando llamar a la API de email en:", emailApiUrl);
    try {
      const response = await fetch(emailApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });

      if (!response.ok) {
        const res = await response.json();
        // El email falló, pero la verificación tuvo éxito.
        // Lo registramos en el log del servidor sin devolver un error al cliente.
        console.warn(
          "A verificação foi bem-sucedida, mas o email falhou:",
          res.error
        );
      }
    } catch (emailError) {
      console.warn(
        "A verificação foi bem-sucedida, mas o email falhou:",
        emailError
      );
    }
  }
  // --- TERMINA LÓGICA DE ENVÍO DE EMAIL ---

  revalidatePath(`/admin/reservas/${eventSlug}`);
  return { success: true, data: updatedReservation };
}
