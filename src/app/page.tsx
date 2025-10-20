import type { Metadata } from "next";
import { HomePageTemplate } from "@/components/templates/HomePageTemplate";

export const metadata: Metadata = {
  title: "Bookish - Red Social de Libros",
  description:
    "Comparte tus lecturas favoritas y conecta con otros amantes de los libros",
};

export default async function HomePage() {
  return <HomePageTemplate />;
}
