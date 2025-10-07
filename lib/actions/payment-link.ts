"use server";

import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import PaymentLinkEmail from "@/app/emails/PaymentLinkEmail";
import { UnverifiedReservation } from "@/app/emails/ReminderEmail";
import { PostgrestError } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPaymentLinkEmail(email: string, paymentLink: string) {
  if (!email || !paymentLink) {
    return {
      success: false,
      error: "O email e o link de pagamento são obrigatórios.",
    };
  }

  const supabase = await createClient();

  // Busca las reservas NO verificadas para ese email
  const { data: unverifiedReservations, error: dbError } = (await supabase
    .from("reservations")
    .select(`id, name, total, event_types ( name )`)
    .eq("email", email)
    .eq("is_verified", false)) as {
    data: UnverifiedReservation[] | null;
    error: PostgrestError | null;
  };

  if (dbError) {
    return { success: false, error: "Falha ao buscar reservas." };
  }

  if (!unverifiedReservations || unverifiedReservations.length === 0) {
    return {
      success: false,
      error: "Este cliente não tem reservas pendentes de pagamento.",
    };
  }

  const grandTotal = unverifiedReservations.reduce(
    (sum, res) => sum + res.total,
    0
  );
  const fullName = unverifiedReservations[0].name;

  try {
    await resend.emails.send({
      from: "Hotel Colonial Iguaçu <reservas@menucolonial.com.br>",
      to: [
        email,
        "reservas@hotelcolonialfoz.com.br",
        "mkt@hotelcolonialfoz.com.br",
      ], // Envía copia al equipo de MKT
      replyTo: "reservas@hotelcolonialfoz.com.br",
      subject: "Ação Necessária: Link de Pagamento da sua Reserva",
      react: await PaymentLinkEmail({
        fullName,
        unverifiedReservations,
        grandTotal,
        paymentLink,
      }),
    });

    return {
      success: true,
      message: `Link de pagamento enviado com sucesso para ${email}.`,
    };
  } catch (emailError) {
    console.error("Erro ao enviar email:", emailError);
    return {
      success: false,
      error: "Falha ao enviar o email com o link de pagamento.",
    };
  }
}
