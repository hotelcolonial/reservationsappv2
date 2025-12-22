import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Text,
  Button,
  Hr,
  Preview,
} from "@react-email/components";
import * as React from "react";

// TEMA DARK + ELEGANCE
const theme = {
  bg: "#052e16", // Verde muy oscuro
  accent: "#4ade80", // Verde neón
  gold: "#d4af37", // Dorado
  text: "#ffffff",
  divider: "rgba(255,255,255,0.15)",
  couponBg: "rgba(74, 222, 128, 0.05)", // Fondo muy sutil para el cupón
};

const baseUrl = "https://hotelcolonialfoz.com.br";

export const OfertaEleganteDarkCupomFinal = ({
  clientName = "Cliente VIP",
}) => (
  <Html>
    <Head>
      <title>Sua Experiência VIP: Jan & Fev 2026</title>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Montserrat:wght@400;600;800&display=swap');
          
          body { margin: 0; padding: 0; background-color: #000000; }
          
          .font-elegant { font-family: 'Playfair Display', Georgia, serif; }
          .font-modern { font-family: 'Montserrat', Helvetica, Arial, sans-serif; }
          
          .list-item { padding: 18px 0; }
        `}
      </style>
    </Head>
    <Preview>
      [CUPOM ESPECIAL] Jantar Incluso + 20% OFF para suas férias. Abra para
      pegar seu código.
    </Preview>
    <Body style={{ backgroundColor: "#ffff", margin: "0", padding: "0" }}>
      <Container
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: theme.bg,
          overflow: "hidden",
        }}
      >
        {/* --- HEADER --- */}
        <Section
          style={{ padding: "30px 20px 10px 20px", textAlign: "center" }}
        >
          <Img
            src="https://i.imgur.com/JqptwFr.png"
            alt="Hotel Colonial Iguaçu"
            width="110"
            style={{
              display: "block",
              margin: "0 auto",
              filter: "brightness(0) invert(1)",
            }}
          />
        </Section>

        {/* --- TEXTO DE EXCLUSIVIDAD VIP --- */}
        <Section style={{ padding: "0 30px 20px 30px", textAlign: "center" }}>
          <Text
            style={{
              color: "#cccccc",
              fontSize: "14px",
              lineHeight: "1.6",
              margin: "0 auto",
              maxWidth: "480px",
            }}
            className="font-modern"
          >
            Olá! Você faz parte da nossa{" "}
            <strong style={{ color: theme.gold }}>Lista de Hóspedes VIP</strong>{" "}
            e merece um tratamento diferenciado. Por isso, liberamos uma
            condição especial válida apenas para você e seus convidados:
          </Text>
        </Section>

        {/* --- HERO --- */}
        <Section style={{ padding: "0 20px 10px 20px", textAlign: "center" }}>
          <Text
            style={{
              color: theme.text,
              fontSize: "46px",
              lineHeight: "1.1",
              margin: "0 0 15px 0",
              fontStyle: "italic",
            }}
            className="font-elegant"
          >
            Férias de Verão VIP <br />
            <span style={{ color: theme.gold }}>2026</span>
          </Text>

          <div
            style={{
              border: `1px solid ${theme.accent}`,
              borderRadius: "0px",
              padding: "8px 25px",
              display: "inline-block",
              marginTop: "10px",
            }}
          >
            <Text
              style={{
                color: theme.accent,
                fontSize: "14px",
                fontWeight: "600",
                margin: "0",
                textTransform: "uppercase",
              }}
              className="font-modern"
            >
              De 01 Jan a 28 Fev
            </Text>
          </div>
        </Section>

        {/* --- IMAGEN --- */}
        <Section style={{ margin: "20px 0 30px 0" }}>
          <Img
            src="https://i.imgur.com/pDgciNV.png"
            alt="Verão em Foz"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderTop: `1px solid ${theme.divider}`,
              borderBottom: `1px solid ${theme.divider}`,
            }}
          />
        </Section>

        {/* --- BENEFICIOS --- */}
        <Section style={{ padding: "0 30px 20px 30px" }}>
          <div className="list-item">
            <Text
              style={{
                color: theme.text,
                fontSize: "24px",
                margin: "0 0 5px 0",
              }}
              className="font-elegant"
            >
              20% OFF{" "}
              <span
                style={{
                  fontSize: "16px",
                  color: theme.gold,
                  fontStyle: "italic",
                }}
              >
                nas diárias
              </span>
            </Text>
            <Text
              style={{
                color: "#aaaaaa",
                fontSize: "13px",
                margin: "0",
                lineHeight: "1.5",
              }}
              className="font-modern"
            >
              Desconto aplicado automaticamente com o cupom para estadias em Jan
              e Fev.
            </Text>
          </div>
          <Hr style={{ borderColor: theme.divider, margin: "0" }} />

          {/* --- JANTAR INCLUSO (ACTUALIZADO) --- */}
          <div className="list-item">
            <Text
              style={{
                color: theme.text,
                fontSize: "24px",
                margin: "0 0 5px 0",
              }}
              className="font-elegant"
            >
              Jantar Incluso
            </Text>
            <Text
              style={{
                color: "#aaaaaa",
                fontSize: "13px",
                margin: "0",
                lineHeight: "1.6",
              }}
              className="font-modern"
            >
              Café da manhã + Jantar todas as noites. <br />
              <span style={{ color: "#888", fontSize: "12px" }}>
                *Serviço em Buffet ou Prato à La Carte (menu selecionado)
                conforme programação do dia. Bebidas não inclusas.
              </span>
            </Text>
          </div>
          <Hr style={{ borderColor: theme.divider, margin: "0" }} />

          <div className="list-item">
            <Text
              style={{
                color: theme.text,
                fontSize: "24px",
                margin: "0 0 5px 0",
              }}
              className="font-elegant"
            >
              Estacionamento Grátis
            </Text>
            <Text
              style={{
                color: "#aaaaaa",
                fontSize: "13px",
                margin: "0",
                lineHeight: "1.5",
              }}
              className="font-modern"
            >
              Cortesia total durante todo o período da sua estadia no hotel.
            </Text>
          </div>
          <Hr style={{ borderColor: theme.divider, margin: "0" }} />

          {/* Item 4: TRANSFER */}
          <div className="list-item">
            <Text
              style={{
                color: theme.text,
                fontSize: "24px",
                margin: "0 0 5px 0",
              }}
              className="font-elegant"
            >
              Transfer Gratuito
            </Text>
            <Text
              style={{
                color: "#aaaaaa",
                fontSize: "13px",
                margin: "0",
                lineHeight: "1.5",
              }}
              className="font-modern"
            >
              Transporte de ida e volta (Aeroporto Foz / Hotel / Aeroporto) sem
              custo.
            </Text>
          </div>
          <Hr style={{ borderColor: theme.divider, margin: "0" }} />
        </Section>

        {/* --- SECCIÓN CUPÓN Y CTA --- */}
        <Section
          style={{
            padding: "40px 20px",
            textAlign: "center",
            backgroundColor: "#022411",
          }}
        >
          <Text
            style={{
              color: "#888888",
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
            className="font-modern"
          >
            CÓDIGO EXCLUSIVO
          </Text>

          {/* --- ESTILO CUPÓN RECORTABLE --- */}
          <div
            style={{
              border: `2px dashed ${theme.accent}`,
              backgroundColor: "rgba(255,255,255,0.05)",
              padding: "20px 40px",
              display: "inline-block",
              borderRadius: "4px",
              marginBottom: "35px",
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: "38px",
                margin: "0",
                letterSpacing: "4px",
                lineHeight: "1",
              }}
              className="font-elegant"
            >
              SOUVIP26
            </Text>
          </div>

          <Button
            href={`https://book.omnibees.com/hotelresults?c=7957&q=13875&hotel_folder=&NRooms=1&CheckIn=04012026&CheckOut=05012026&ad=2&ch=0&ag=&Code=SOUVIP26&lang=pt-BR&currencyId=16`}
            style={{
              backgroundColor: theme.accent,
              color: "#052e16",
              padding: "18px 45px",
              borderRadius: "0px",
              fontSize: "16px",
              fontWeight: "800",
              textDecoration: "none",
              display: "inline-block",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
            className="font-modern"
          >
            Reservar Minha Vaga
          </Button>

          {/* --- CAJA DE AVISO IMPORTANTE --- */}
          <div
            style={{
              marginTop: "35px",
              border: `1px solid ${theme.gold}`,
              padding: "15px",
              maxWidth: "400px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text
              style={{
                color: theme.gold,
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                margin: "0 0 5px 0",
              }}
              className="font-modern"
            >
              ⚠️ Disponibilidade Limitada
            </Text>
            <Text
              style={{
                color: "#bbbbbb",
                fontSize: "12px",
                margin: "0",
                lineHeight: "1.4",
              }}
              className="font-modern"
            >
              Oferta válida exclusivamente de{" "}
              <strong>01/01/2026 a 28/02/2026</strong>. <br />
              Poucos quartos disponíveis nesta tarifa.
            </Text>
          </div>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default OfertaEleganteDarkCupomFinal;
