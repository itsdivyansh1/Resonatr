import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Link,
  Section,
} from "@react-email/components";

type ResonatrEmailProps = {
  subject: string;
  meta: {
    description: string;
    link: string;
  };
};

export default function ResonatrEmail({ subject, meta }: ResonatrEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{meta.description}</Preview>
      <Body
        style={{
          backgroundColor: "#f1f5f9", // slate-100
          fontFamily: "'Inter', sans-serif",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            padding: "32px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Header */}
          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Text
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#1e293b", // slate-800
                margin: "0",
              }}
            >
              Resonatr
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: "#64748b", // slate-500
                margin: "4px 0 0",
              }}
            >
              {subject}
            </Text>
          </Section>

          {/* Body */}
          <Text
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#334155", // slate-700
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {meta.description}
          </Text>

          <Section style={{ textAlign: "center", marginTop: "20px" }}>
            <Link
              href={meta.link}
              style={{
                display: "inline-block",
                padding: "12px 20px",
                backgroundColor: "#2563eb", // blue-600
                color: "#ffffff",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Click here
            </Link>
          </Section>

          {/* Footer */}
          <Text
            style={{
              marginTop: "40px",
              fontSize: "12px",
              color: "#94a3b8", // slate-400
              borderTop: "1px solid #e2e8f0",
              paddingTop: "16px",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} Resonatr. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
