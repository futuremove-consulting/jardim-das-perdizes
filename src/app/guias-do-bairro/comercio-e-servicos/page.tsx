import { buildPageMetadata } from "@/lib/seo/metadata";
import { GUIAS } from "@/data/guias";
import GuiaPage from "@/components/content/GuiaPage";
import type { FaqItem } from "@/lib/seo/schemas";

const guia = GUIAS["comercio-e-servicos"];

export const metadata = buildPageMetadata({
  title: guia.metaTitle,
  description: guia.metaDescription,
  path: `/guias-do-bairro/${guia.slug}/`,
});

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Tem mercado dentro do Jardim das Perdizes?",
    answer:
      "Sim. O artigo institucional do parque cita mercado, padaria, farmácia, restaurante, sorveteria, pet shop e salão de beleza dentro do bairro. No entorno há Bourbon Shopping e West Plaza.",
  },
  {
    question: "Onde ficam os serviços do dia a dia?",
    answer:
      "Parte da vida comercial se concentra em endereços corporativos: o portal Guia Jardim das Perdizes documenta serviços em salas do Office/Corporate TIME, como o Sterna Café.",
  },
  {
    question: "Os horários de funcionamento estão verificados?",
    answer:
      "Não. Horários, endereços e operação mudam. Confirme cada estabelecimento antes da visita.",
  },
];

export default function ComercioPage() {
  return <GuiaPage guia={guia} faq={FAQ_ITEMS} />;
}
