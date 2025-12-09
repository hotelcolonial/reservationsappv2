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
} from "@react-email/components";
import * as React from "react";

const baseUrl = "https://hotelcolonialfoz.com.br"; // ENLACE A TU MOTOR DE RESERVAS

// --- ESTILOS GLOBALES ---
const bodyStyle = {
  fontFamily: "'Roboto', Helvetica, Arial, sans-serif",
  backgroundColor: "#f6f6f6",
  margin: "0",
  padding: "0",
};

const containerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#0d0d0d",
  color: "#fff",
};

// --- ESTILOS DE TARJETAS DE CUPÓN ---
const cardBaseStyle = {
  backgroundColor: "#161616",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "15px",
  textAlign: "center" as const,
};

const codeBoxStyle = {
  background: "#000",
  border: "1px dashed #555",
  borderRadius: "4px",
  padding: "10px",
  margin: "10px 0",
  fontFamily: "monospace",
  fontSize: "18px",
  fontWeight: "bold",
  letterSpacing: "1px",
};

const bonusBoxStyle = {
  backgroundColor: "#111",
  border: "1px dashed #ef4444",
  borderRadius: "6px",
  padding: "15px",
  marginTop: "10px",
  textAlign: "center" as const,
};

export const ColonialVipReminder = () => (
  <Html>
    <Head>
      <title>Você esqueceu disto? Seu cupom de 45%</title>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&family=Roboto:wght@400;700&display=swap');
        `}
      </style>
    </Head>
    <Body style={bodyStyle}>
      <Container style={containerStyle}>
        {/* HEADER */}
        <Section
          style={{
            backgroundColor: "#000",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <Img
            src="https://i.imgur.com/rVQjMDn.png"
            alt="Hotel Colonial Iguaçu"
            width="100"
            style={{ display: "block", margin: "0 auto" }}
          />
        </Section>

        {/* TITULAR DE IMPACTO (MODIFICADO PARA RECORDATORIO) */}
        <Section
          style={{ padding: "30px 20px 10px 20px", textAlign: "center" }}
        >
          <Text
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "14px",
              color: "#facc15", // Amarillo alerta
              letterSpacing: "2px",
              fontWeight: "700",
              textTransform: "uppercase",
              margin: "0 0 10px 0",
            }}
          >
            AINDA DÁ TEMPO
          </Text>

          <Text
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "28px",
              fontWeight: "800",
              color: "#fff",
              lineHeight: "1.2",
              margin: "0",
            }}
          >
            Seu Cupom Continua Ativo. <br />
            <span style={{ color: "#888", fontSize: "20px" }}>
              (Por enquanto...)
            </span>
          </Text>
        </Section>

        {/* IMAGEN PRINCIPAL */}
        <Section style={{ padding: "10px 20px" }}>
          <Img
            src="https://i.imgur.com/O7gq2Xx.png"
            alt="Colonial Black VIP"
            width="540"
            style={{
              width: "100%",
              maxWidth: "540px",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Section>

        {/* TEXTO INTRODUCTORIO (MODIFICADO: PSICOLOGÍA DE OPORTUNIDAD PERDIDA) */}
        <Section style={{ padding: "10px 30px" }}>
          <Text
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: "16px",
              color: "#ccc",
              lineHeight: "1.6",
              textAlign: "center",
            }}
          >
            Olá VIP,
            <br />
            <br />
            Notamos que você abriu seu acesso exclusivo, mas{" "}
            <strong>ainda não finalizou sua reserva</strong> para 2026.
            <br />
            <br />
            Sabemos que imprevistos acontecem, mas precisamos te avisar: os
            cupons de <strong>45% OFF</strong> estão nas últimas unidades e as
            datas mais concorridas (feriados) estão sendo preenchidas rápido.
            <br />
            <br />
            <span style={{ color: "#fff", fontWeight: "bold" }}>
              Não deixe sua vaga escapar. Aqui estão seus códigos novamente:
            </span>
          </Text>
        </Section>

        {/* SECCIÓN DE CUPONES */}
        <Section style={{ padding: "10px 20px" }}>
          {/* --- TARJETA ORO (CON ALERTA DE ÚLTIMAS UNIDADES) --- */}
          <div
            style={{
              ...cardBaseStyle,
              border: "1px solid #ffd700",
              boxShadow: "0 0 15px rgba(255, 215, 0, 0.15)",
              position: "relative",
            }}
          >
            {/* BADGE DE ALERTA */}
            <div
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                padding: "4px 10px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "bold",
                display: "inline-block",
                marginBottom: "10px",
              }}
            >
              🔴 ÚLTIMAS UNIDADES
            </div>

            <Text
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "42px",
                fontWeight: "800",
                color: "#fff",
                margin: "5px 0",
                lineHeight: "1",
              }}
            >
              45% OFF
            </Text>

            {/* CAJA DE CÓDIGO */}
            <div
              style={{
                ...codeBoxStyle,
                borderColor: "#ffd700",
                color: "#ffd700",
              }}
            >
              COLONIALVIP45OFF
            </div>

            <Text
              style={{ margin: "5px 0 0 0", fontSize: "13px", color: "#aaa" }}
            >
              Tente usar este primeiro. Se não funcionar, ele esgotou.
            </Text>
          </div>

          {/* --- TARJETA PLATA --- */}
          <div
            style={{
              ...cardBaseStyle,
              border: "1px solid #C0C0C0",
            }}
          >
            <Text
              style={{
                margin: "0",
                fontSize: "14px",
                color: "#C0C0C0",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Opção Segura
            </Text>
            <Text
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "36px",
                fontWeight: "800",
                color: "#fff",
                margin: "5px 0",
                lineHeight: "1",
              }}
            >
              35% OFF
            </Text>

            {/* CAJA DE CÓDIGO */}
            <div
              style={{ ...codeBoxStyle, borderColor: "#555", color: "#e0e0e0" }}
            >
              COLONIALVIP35OFF
            </div>
          </div>

          {/* --- TARJETA BRONCE --- */}
          <div
            style={{
              ...cardBaseStyle,
              border: "1px solid #cd7f32",
              marginBottom: "0",
            }}
          >
            <Text
              style={{
                margin: "0",
                fontSize: "14px",
                color: "#cd7f32",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Garantido
            </Text>
            <Text
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "32px",
                fontWeight: "800",
                color: "#fff",
                margin: "5px 0",
                lineHeight: "1",
              }}
            >
              30% OFF
            </Text>

            {/* CAJA DE CÓDIGO */}
            <div
              style={{
                ...codeBoxStyle,
                borderColor: "#4ade80",
                color: "#4ade80",
              }}
            >
              COLONIALBLACK30OFF
            </div>
          </div>
        </Section>

        {/* CTA (MODIFICADO: MÁS URGENCIA) */}
        <Section style={{ padding: "0 0 20px 0", textAlign: "center" }}>
          <Button
            href={baseUrl}
            style={{
              backgroundColor: "#1E6B43",
              color: "#ffffff",
              padding: "18px 40px",
              borderRadius: "5px",
              textDecoration: "none",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: "800",
              fontSize: "20px",
              display: "inline-block",
              boxShadow: "0 4px 0 #144a2e",
            }}
          >
            FINALIZAR MINHA RESERVA
          </Button>
          <Text style={{ fontSize: "12px", color: "#666", marginTop: "15px" }}>
            *Não deixe para depois. A disponibilidade muda a cada minuto.
          </Text>
        </Section>

        {/* --- SECCIÓN NAVIDAD 2025 --- */}
        <Section style={{ padding: "0 30px 20px 30px" }}>
          <div style={bonusBoxStyle}>
            <Text
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "16px",
                fontWeight: "700",
                color: "#ef4444", // Rojo Navidad
                margin: "0 0 5px 0",
                textTransform: "uppercase",
              }}
            >
              🎅 NÃO ESQUEÇA O NATAL 2025
            </Text>
            <Text
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: "14px",
                color: "#ccc",
                margin: "0",
                lineHeight: "1.5",
              }}
            >
              Este bônus também está te esperando:{" "}
              <strong>10% DE DESCONTO</strong> no{" "}
              <strong>Pacote de Natal 2025</strong> (4 ou 5 noites).
            </Text>
          </div>
        </Section>

        <Hr style={{ borderColor: "#333", marginTop: "20px" }} />

        {/* FOOTER */}
        <Section style={{ padding: "30px" }}>
          <Text
            style={{ fontSize: "12px", color: "#888", textAlign: "center" }}
          >
            Hotel Colonial Iguaçu • Foz do Iguaçu, PR
            <br />
            Este é um lembrete automático para membros VIP.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ColonialVipReminder;
