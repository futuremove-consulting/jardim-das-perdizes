import { buildPageMetadata } from "@/lib/seo/metadata";
import { GUIAS } from "@/data/guias";
import GuiaPage from "@/components/content/GuiaPage";
import type { FaqItem } from "@/lib/seo/schemas";

const guia = GUIAS["transporte-e-mobilidade"];

export const metadata = buildPageMetadata({
  title: guia.metaTitle,
  description: guia.metaDescription,
  path: `/guias-do-bairro/${guia.slug}/`,
});

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "O metrô já funciona no Jardim das Perdizes?",
    answer:
      "A Linha 6-Laranja está em operação assistida desde 01/07/2026 em trecho parcial (João Paulo I a Perdizes), sem cobrança inicial. A estação Água Branca integra com a Linha 7-Rubi. A operação comercial plena ainda não está confirmada.",
  },
  {
    question: "Quanto tempo leva para chegar ao centro?",
    answer:
      "Não medimos tempos porta a porta. O '23 minutos' citado pela concessionária é trajeto de trem da linha completa, não tempo de porta a porta do bairro. Verifique a rota real no horário que você usa.",
  },
  {
    question: "O bairro é acessível a pé e de bicicleta?",
    answer:
      "As fontes citam calçadas largas e acessíveis, ciclovia e bikesharing no entorno. A experiência real depende do trecho e do horário — confirme na visita.",
  },
];

export default function TransportePage() {
  return <GuiaPage guia={guia} faq={FAQ_ITEMS} />;
}
