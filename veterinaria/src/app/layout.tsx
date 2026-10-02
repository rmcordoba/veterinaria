import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veterinaria Tucumán",
  description: "Plataforma de turnos online y fichas clínicas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
