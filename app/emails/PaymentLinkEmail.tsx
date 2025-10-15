// No necesita "use client" - es un Server Component
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface UnverifiedReservation {
  total: number;
  event_types: {
    name: string;
  } | null;
}

interface PaymentLinkEmailProps {
  fullName: string;
  unverifiedReservations: UnverifiedReservation[];
  grandTotal: number;
  paymentLink: string; // La nueva prop para el link de pago
}

export const PaymentLinkEmail: React.FC<PaymentLinkEmailProps> = ({
  fullName,
  unverifiedReservations,
  grandTotal,
  paymentLink,
}) => {
  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#0a3a2a",
                offwhite: "#faf7f0",
                accent: "#f59e0b",
              },
            },
          },
        }}
      >
        <Head />
        <Preview>Finalize sua reserva no Hotel Colonial Iguaçu</Preview>
        <Body className="bg-offwhite text-base font-sans p-4">
          <Img
            alt="Hotel Colonial Iguaçu Logo"
            className="mx-auto my-6"
            width={130}
            src="https://res.cloudinary.com/dgthv7vlu/image/upload/v1730837484/colonial-logo_qmirod.png"
          />
          <Container className="bg-white p-8 rounded-lg shadow-lg max-w-xl mx-auto">
            <Heading className="text-center my-0 text-3xl font-greatvibes text-brand">
              Sua Reserva Está Pronta!
            </Heading>

            <Section className="my-6">
              <Text className="text-center text-gray-700 text-lg">
                Olá, <strong>{fullName}</strong>!
              </Text>
              <Text className="text-center text-gray-700 text-lg">
                Agradecemos por escolher celebrar as festas de fim de ano
                conosco. Sua pré-reserva foi processada e agora você pode
                finalizar o pagamento para garantir suas vagas.
              </Text>
            </Section>

            <Section className="border border-gray-200 rounded-lg p-6 my-6">
              <Heading
                as="h2"
                className="text-center text-xl font-greatvibes text-brand m-0 mb-4"
              >
                Resumo para Pagamento
              </Heading>

              {unverifiedReservations.map((res, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-gray-600 py-2 border-b"
                >
                  <span>{res.event_types?.name || "Evento Especial"}</span>
                  <span className="font-medium">R$ {res.total.toFixed(2)}</span>
                </div>
              ))}

              <div className="flex justify-between items-center text-brand font-bold text-xl pt-4">
                <span>VALOR TOTAL: </span>
                <span>R$ {grandTotal.toFixed(2)}</span>
              </div>
            </Section>

            <Section className="mt-8 text-center">
              <Text className="text-lg font-semibold">
                Aqui está o seu link de pagamento seguro:
              </Text>
              <Button
                className="bg-accent text-white px-8 py-4 rounded-lg font-bold text-lg mt-4"
                href={paymentLink}
              >
                Pagar Agora
              </Button>
              <Text className="text-xs text-muted-foreground mt-2">
                (Link válido por tempo limitado)
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PaymentLinkEmail;
