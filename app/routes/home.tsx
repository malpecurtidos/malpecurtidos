import type { Route } from "./+types/home";
import { Hero } from "~/components/home/hero";
import { Features } from "~/components/home/features";
import { Cta } from "~/components/home/cta";
import { Cards } from "~/components/home/cards";
import { Testimonials } from "~/components/home/testimonials";
import { Cta2 } from "~/components/home/cta-2";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MALPE Curtidos - Encuentra los Mejores Curtidos del Mercado" },
    { name: "description", content: "Descubre la calidad premium de MALPE Curtidos. Ofrecemos una amplia variedad de encurtidos artesanales, pickles y conservas gourmet para realzar tus comidas." },
    // Open Graph para Facebook
    { property: "og:title", content: "MALPE Curtidos - Encuentra los Mejores Curtidos del Mercado" },
    { property: "og:description", content: "Descubre la calidad premium de MALPE Curtidos. Ofrecemos una amplia variedad de encurtidos artesanales, pickles y conservas gourmet para realzar tus comidas." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://malpecurtidos.com" },
    // Twitter Cards
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "MALPE Curtidos - Encuentra los Mejores Curtidos del Mercado" },
    { name: "twitter:description", content: "Descubre la calidad premium de MALPE Curtidos. Ofrecemos una amplia variedad de encurtidos artesanales, pickles y conservas gourmet para realzar tus comidas." },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Cards />
      <Cta />
      <Testimonials />
      <Cta2 />
    </>
  );
}
