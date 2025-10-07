import { Resend } from "resend";
import VerificationEmail from "@/app/emails/VerificationEmail"; // Ajusta la ruta a donde moviste el email
import { Reservation } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { reservation, eventName } = body as {
      reservation: Reservation;
      eventName: string;
    };

    if (!reservation || !eventName) {
      return new Response(
        JSON.stringify({ error: "Dados da reserva ausentes." }),
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Hotel Colonial Iguaçu <reservas@menucolonial.com.br>",
      to: [
        "mkt@hotelcolonialfoz.com.br", // Email interno
        reservation.email,
        "reservas@hotelcolonialfoz.com.br", // Email del cliente
      ],
      subject: `Sua reserva para ${eventName} está confirmada!`,
      react: await VerificationEmail({
        reservation,
        eventName,
      }),
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ message: "Email de verificação enviado com sucesso." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Falha ao processar a solicitação de email:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor." }),
      {
        status: 500,
      }
    );
  }
}
