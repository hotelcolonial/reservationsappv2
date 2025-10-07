import PreReservationClientEmail from "@/app/emails/PreReservationClientEmail";
import { Resend } from "resend";
import { Reservation } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  // 1. Recibimos el payload completo del frontend
  const body = await request.json();

  // 2. Extraemos los datos necesarios (que coinciden con las props del email)
  const {
    email,
    fullName,
    adults,
    children0to6,
    children7to11,
    bookedEvents,
    grandTotal,
    reservationDate,
  } = body;

  try {
    await resend.emails.send({
      from: "Hotel Colonial Iguaçu <reservas@menucolonial.com.br>",
      to: [
        "mkt@hotelcolonialfoz.com.br",
        "reservas@hotelcolonialfoz.com.br", // Email interno
        email, // Email del cliente
      ],
      subject: `Pré-reserva confirmada: ${bookedEvents.map((e: Reservation) => e.name).join(", ")}`,

      // 3. Pasamos TODAS las props al componente de React
      react: await PreReservationClientEmail({
        fullName,
        email,
        adults,
        children0to6,
        children7to11,
        bookedEvents,
        grandTotal,
        reservationDate,
      }),
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
