import { StoreProvider } from "../lib/StoreProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
