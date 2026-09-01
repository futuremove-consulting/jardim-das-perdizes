import { buildPageMetadata } from "@/lib/seo/metadata";
import { GUIAS } from "@/data/guias";
import GuiaPage from "@/components/content/GuiaPage";
import type { FaqItem } from "@/lib/seo/schemas";

const guia = GUIAS["bares-e-restaurantes"];

export const metadata = buildPageMetadata({
  title: guia.metaTitle,
  description: guia.metaDescription,
  path: `/guias-do-bairro/${guia.slug}/`,
});

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Tem restaurantes dentro do Jardim das Perdizes?",
    answer:
      "Sim. As fontes documentam o Reserva Rooftop, citado como restaurante criado para atrair clientes ao bairro, e o Sterna Café no Corporate TIME. No entorno imediato há Bráz Pizzaria, Écully Charbon, Quintal do Bráz e outras casas.",
  },
  {
    question: "Os preços e horários estão verificados?",
    answer:
      "Não. Preços, horários e operação mudam com frequência. A Veja São Paulo (2022) é fonte histórica de contexto; confirme cada casa antes da visita.",
  },
  {
    question: "O bairro tem vida noturna?",
    answer:
      "As fontes citam bares e restaurantes no entorno (Deep Bar 611, Petí Gastronomia, entre outros), mas não há medição de movimento noturno no acervo. Verifique na visita o fluxo em horários diferentes.",
  },
];

export default function BaresRestaurantesPage() {
  return <GuiaPage guia={guia} faq={FAQ_ITEMS} />;
}
