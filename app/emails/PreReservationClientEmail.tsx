import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
  Hr,
} from "@react-email/components";

// La nueva estructura de datos para soportar múltiples eventos
interface BookedEvent {
  id: string;
  name: string;
  date: string;
  price: number;
}

interface PreReservationEmailProps {
  fullName: string;
  email: string;
  adults: number;
  children0to6: number;
  children7to11: number;
  bookedEvents: BookedEvent[];
  grandTotal: number;
  reservationDate: string;
}

const PreReservationClientEmail: React.FC<PreReservationEmailProps> = ({
  fullName,
  email,
  adults,
  children0to6,
  children7to11,
  bookedEvents,
  grandTotal,
  reservationDate,
}) => {
  // Creamos un asunto dinámico para el botón de contacto
  const subjectLine = `Dúvida sobre as pré-reservas de ${fullName}`;

  return (
    <Html>
      {/* ===== CORRECCIÓN AQUÍ: <Tailwind> envuelve todo ===== */}
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
        <Head /> {/* Ahora <Head> está DENTRO de <Tailwind> */}
        <Preview>
          Sua pré-reserva no Hotel Colonial Iguaçu foi recebida!
        </Preview>
        <Body className="bg-offwhite text-base font-sans p-4">
          <Img
            alt="Hotel Colonial Iguaçu Logo"
            className="mx-auto my-6"
            width={80}
            src="https://res.cloudinary.com/dgthv7vlu/image/upload/v1730837484/colonial-logo_qmirod.png"
          />
          <Container className="bg-white p-8 rounded-lg shadow-lg max-w-xl mx-auto">
            <Heading className="text-center my-0 text-3xl font-greatvibes text-brand">
              Olá, {fullName}!
            </Heading>

            <Section className="my-6">
              <Text className="text-center text-gray-700 text-lg">
                Recebemos com sucesso sua solicitação de pré-reserva. Abaixo
                estão os detalhes:
              </Text>
            </Section>

            <Section className="border border-gray-200 rounded-lg p-6 my-6">
              <Row>
                <Column>
                  <Text className="text-gray-600 m-0">
                    Data da Solicitação:
                  </Text>
                  <Text className="font-semibold text-gray-800 m-0">
                    {reservationDate}
                  </Text>
                </Column>
                <Column>
                  <Text className="text-gray-600 m-0">Hóspedes:</Text>
                  <Text className="text-gray-800 m-0">
                    <strong>{adults}</strong> Adultos,{" "}
                    <strong>{children7to11}</strong> Crianças (7-11),{" "}
                    <strong>{children0to6}</strong> Crianças (0-6)
                  </Text>
                </Column>
              </Row>
            </Section>

            <Heading className="text-center text-2xl font-greatvibes text-brand">
              Eventos Pré-Reservados
            </Heading>

            {bookedEvents.map((event) => (
              <Section key={event.id} className="my-4">
                <Row>
                  <Column>
                    <Text className="font-bold text-lg text-brand m-0">
                      {event.name}
                    </Text>
                    <Text className="text-gray-500 m-0">{event.date}</Text>
                  </Column>
                  <Column className="text-right">
                    {/*   <Text className="font-semibold text-gray-600 m-0">
                      ID: #{event.id}
                    </Text> */}
                  </Column>
                </Row>
                <Row className="mt-2">
                  <Column>
                    <Text className="text-gray-700 m-0">
                      Subtotal do Evento:
                    </Text>
                  </Column>
                  <Column className="text-right">
                    <Text className="font-semibold text-brand m-0">
                      R$ {event.price.toFixed(2)}
                    </Text>
                  </Column>
                </Row>
                <Hr className="border-gray-200 my-4" />
              </Section>
            ))}

            <Section>
              <Row>
                <Column>
                  <Text className="font-bold text-xl text-gray-800 m-0">
                    Valor Total da Pré-Reserva:
                  </Text>
                </Column>
                <Column className="text-right">
                  <Text className="font-bold text-2xl text-brand m-0">
                    R$ {grandTotal.toFixed(2)}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section className="mt-8 text-center bg-offwhite p-6 rounded-lg">
              <Heading className="text-2xl font-greatvibes text-brand">
                O que acontece agora?
              </Heading>
              <Text className="text-gray-700">
                Esta é uma <strong>pré-reserva</strong>. Para garantir suas
                vagas, nossa equipe de reservas entrará em contato através do
                seu email (<strong>{email}</strong>) para fornecer o link de
                pagamento.
              </Text>
            </Section>

            <Section className="mt-8 text-center">
              <Button
                className="bg-transparent border border-brand text-white px-5 py-2 rounded-lg  text-sm bg-brand "
                href={`mailto:reservas@hotelcolonialfoz.com.br?subject=${encodeURIComponent(
                  subjectLine
                )}`}
              >
                Falar com a Reserva
              </Button>
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

export default PreReservationClientEmail;
