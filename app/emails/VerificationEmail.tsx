import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr,
} from "@react-email/components";
import { Reservation } from "@/lib/types"; // Importamos el tipo Reservation

// Las props ahora son mucho más simples: la reserva y el nombre del evento.
interface VerificationEmailProps {
  reservation: Reservation;
  eventName: string;
}

export const VerificationEmail: React.FC<VerificationEmailProps> = ({
  reservation,
  eventName,
}) => {
  const { name, locator, adults, children_0_6, children_7_11, total } =
    reservation;

  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#0a3a2a",
                offwhite: "#faf7f0",
                accent: "#e5b842",
              },
            },
          },
        }}
      >
        <Head />
        <Preview>Sua reserva para {eventName} está confirmada!</Preview>
        <Body className="bg-offwhite text-base font-sans p-4">
          <Img
            alt="Hotel Colonial Iguaçu Logo"
            className="mx-auto my-6"
            width={130}
            src="https://res.cloudinary.com/dgthv7vlu/image/upload/v1730837484/colonial-logo_qmirod.png"
          />
          <Container className="bg-white p-8 rounded-lg shadow-lg max-w-xl mx-auto">
            <Heading className="text-center my-0 text-3xl font-greatvibes text-brand">
              Reserva Confirmada!
            </Heading>

            <Section className="my-6">
              <Text className="text-center text-gray-700 text-lg">
                Olá, <strong>{name}</strong>! Temos o prazer de confirmar sua
                reserva para o nosso evento especial.
              </Text>
            </Section>

            <Section className="border border-green-200 bg-green-50/50 rounded-lg p-6 my-6">
              <Heading
                as="h2"
                className="text-center text-2xl font-greatvibes text-brand m-0"
              >
                {eventName}
              </Heading>

              <Hr className="border-gray-300 my-4" />

              <Text className="text-center text-gray-800 text-lg">
                Seu localizador é:
                <br />
                <span className="font-bold text-2xl text-sky-600 tracking-wider">
                  {locator || "N/A"}
                </span>
              </Text>

              <Hr className="border-gray-300 my-4" />

              <Text className="text-center text-gray-600">
                <strong>Hóspedes:</strong> {adults} Adultos, {children_7_11}{" "}
                Crianças (7-11), {children_0_6} Crianças (0-6)
              </Text>
              <Text className="text-center font-bold text-lg text-brand">
                Total Pago: R$ {total.toFixed(2)}
              </Text>
            </Section>

            <Section className="mt-8 text-center">
              <Text className="text-gray-700">
                Estamos ansiosos para recebê-lo! Guarde este email como
                comprovante da sua reserva. Se tiver alguma dúvida, por favor,
                entre em contato com nossa equipe.
              </Text>
            </Section>
          </Container>

          <Text className="text-center text-gray-500 text-xs mt-8">
            Hotel Colonial Iguaçu | Av. das Cataratas, KM 20, Foz do Iguaçu - PR
          </Text>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
