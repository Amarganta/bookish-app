import { Poppins } from "next/font/google";
import StoreProvider from "@lib/StoreProvider";
import "./global.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={poppins.variable}>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
