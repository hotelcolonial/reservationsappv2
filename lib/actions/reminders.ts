"use server";

import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import ReminderEmail from "@/app/emails/ReminderEmail";
import type { UnverifiedReservation } from "@/app/emails/ReminderEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReminderEmail(email: string) {
  if (!email) {
    return { success: false, error: "O email não pode estar vazio." };
  }

  const supabase = await createClient();

  // 1. Busca todas las reservas AÚN NO VERIFICADAS para este email.
  const { data: unverifiedReservations, error: dbError } = (await supabase
    .from("reservations")
    .select(`id, name, total, event_types ( name )`)
    .eq("email", email)
    .eq("is_verified", false)) as {
    data: UnverifiedReservation[] | null;
    error: any;
  };

  if (dbError) {
    console.error("Erro na base de dados:", dbError);
    return { success: false, error: "Falha ao buscar reservas." };
  }

  if (!unverifiedReservations || unverifiedReservations.length === 0) {
    return {
      success: false,
      error: "Este cliente não tem reservas pendentes de pagamento.",
    };
  }

  // 2. Calcula el total a pagar
  const grandTotal = unverifiedReservations.reduce(
    (sum, res) => sum + res.total,
    0
  );
  const fullName = unverifiedReservations[0].name;

  try {
    await resend.emails.send({
      from: "Hotel Colonial Iguaçu <reservas@menucolonial.com.br>", // Dirección de envío
      to: [
        email,
        "mkt@hotelcolonialfoz.com.br",
        "reservas@hotelcolonialfoz.com.br",
      ],
      // 3. ¡AÑADIMOS EL REPLY-TO

      replyTo: "reservas@hotelcolonialfoz.com.br", // Dirección de respuesta
      subject:
        "Lembrete de Pagamento: Finalize sua reserva no Hotel Colonial Iguaçu",
      react: await ReminderEmail({
        fullName,
        unverifiedReservations,
        grandTotal,
      }),
    });

    return {
      success: true,
      message: `Lembrete de pagamento enviado com sucesso para ${email}.`,
    };
  } catch (emailError) {
    console.error("Erro ao enviar email:", emailError);
    return { success: false, error: "Falha ao enviar o email de lembrete." };
  }
}
