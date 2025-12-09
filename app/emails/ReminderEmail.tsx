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
  Button, // Importamos el componente Button
} from "@react-email/components";

export interface UnverifiedReservation {
  id: number;
  total: number;
  name: string;
  event_types: {
    name: string;
  };
}

// Actualizamos las props del email
interface ReminderEmailProps {
  fullName: string;
  unverifiedReservations: UnverifiedReservation[];
  grandTotal: number;
}

export const ReminderEmail: React.FC<ReminderEmailProps> = ({
  fullName,
  unverifiedReservations,
  grandTotal,
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
        <Preview>Sua reserva está quase confirmada! Ação necessária.</Preview>
        <Body className="bg-offwhite text-base font-sans p-4">
          <Img
            alt="Hotel Colonial Iguaçu Logo"
            className="mx-auto my-6"
            width={130}
            src="https://res.cloudinary.com/dgthv7vlu/image/upload/v1730837484/colonial-logo_qmirod.png"
          />
          <Container className="bg-white p-8 rounded-lg shadow-lg max-w-xl mx-auto">
            <Heading className="text-center my-0 text-3xl font-greatvibes text-brand">
              Sua Reserva Aguarda Pagamento
            </Heading>

            <Section className="my-6">
              <Text className="text-center text-gray-700 text-lg">
                Olá, <strong>{fullName}</strong>.
              </Text>
              <Text className="text-center text-gray-700 text-lg">
                Este é um lembrete de que sua pré-reserva foi recebida com
                sucesso. Para finalizar e garantir suas vagas, por favor, efetue
                o pagamento através do link que enviamos para o seu email.
              </Text>
            </Section>

            <Section className="border border-gray-200 rounded-lg p-6 my-6">
              <Heading
                as="h2"
                className="text-center text-xl font-greatvibes text-brand m-0 mb-4"
              >
                Resumo da Pré-Reserva
              </Heading>

              {unverifiedReservations.map((res) => (
                <div
                  key={res.id}
                  className="flex justify-between items-center text-gray-600 py-2 border-b"
                >
                  <span>{res.event_types?.name || "Evento Especial"}</span>
                  <span className="font-medium">R$ {res.total.toFixed(2)}</span>
                </div>
              ))}

              <div className="flex justify-between items-center text-brand font-bold text-xl pt-4">
                <span>VALOR TOTAL: </span>
                <span> R$ {grandTotal.toFixed(2)}</span>
              </div>
            </Section>

            <Section className="mt-8 text-center bg-amber-50 p-6 rounded-lg">
              <Heading
                as="h3"
                className="text-2xl font-greatvibes text-amber-700"
              >
                Como Pagar?
              </Heading>
              <Text className="text-gray-700">
                Por favor, verifique sua caixa de entrada (e a pasta de spam)
                para encontrar o email com o link de pagamento seguro. Se não o
                recebeu, entre em contato conosco.
              </Text>
              <Button
                className="bg-brand text-white px-6 py-3 rounded-lg font-semibold mt-4"
                href={`mailto:reservas@hotelcolonialfoz.com.br?subject=Dúvida sobre pagamento da pré-reserva`}
              >
                Falar com a Reserva
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ReminderEmail;
