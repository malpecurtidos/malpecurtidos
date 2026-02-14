import type { Route } from "./+types/showroom";
import { ShowroomGrid } from "~/components/showroom/ShowroomGrid";
import { Circular3DShowroom } from "~/components/showroom/Circular3DShowroom";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Showroom Virtual | MALPE Curtidos" },
    {
      name: "description",
      content:
        "Visualiza productos ejemplo fabricados con nuestras pieles premium. Muestrario interactivo B2B para empresas fabricantes.",
    },
  ];
}

export default function Showroom() {
  return (
    <div className="bg-white min-h-screen">
      {/* ── Circular Gallery Hero Section (Modular) ── */}
      <Circular3DShowroom />

      {/* ── Product Grid Section ── */}
      <ShowroomGrid />
    </div>
  );
}
