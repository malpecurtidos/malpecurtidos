import type { Route } from "./+types/nosotros";
import { AboutHero } from "~/components/nosotros/about-hero";
import { AboutIntro } from "~/components/nosotros/about-intro";
import { AboutStats } from "~/components/nosotros/about-stats";
import { AboutPilares } from "~/components/nosotros/about-pilares";
import { AboutValores } from "~/components/nosotros/about-valores";
import { AboutCTA } from "~/components/nosotros/about-cta";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nosotros - MALPE Curtidos" },
    { name: "description", content: "Somos líderes en proveeduría de cuero en Latinoamérica, combinando tradición artesanal con innovación tecnológica desde 1995." },
    // Open Graph para Facebook
    { property: "og:title", content: "Nosotros - MALPE Curtidos" },
    { property: "og:description", content: "Somos líderes en proveeduría de cuero en Latinoamérica, combinando tradición artesanal con innovación tecnológica desde 1995." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://malpecurtidos.com/nosotros" },
    // Twitter Cards
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Nosotros - MALPE Curtidos" },
    { name: "twitter:description", content: "Somos líderes en proveeduría de cuero en Latinoamérica, combinando tradición artesanal con innovación tecnológica desde 1995." },
  ];
}

export default function Nosotros() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutPilares />
      <AboutStats />
      <AboutValores />
      <AboutCTA />
    </>
  );
}
