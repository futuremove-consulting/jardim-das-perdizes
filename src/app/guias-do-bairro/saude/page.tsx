import { buildPageMetadata } from "@/lib/seo/metadata";
import { GUIAS } from "@/data/guias";
import GuiaPage from "@/components/content/GuiaPage";
import type { FaqItem } from "@/lib/seo/schemas";

const guia = GUIAS.saude;

export const metadata = buildPageMetadata({
  title: guia.metaTitle,
  description: guia.metaDescription,
  path: `/guias-do-bairro/${guia.slug}/`,
});

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Quais hospitais ficam perto do Jardim das Perdizes?",
    answer:
      "As fontes citam três hospitais de referência no entorno: Albert Einstein Unidade Perdizes, São Camilo Pompeia e Samaritano Higienópolis. Dentro do bairro há farmácia e clínicas em endereços corporativos.",
  },
  {
    question: "Os convênios são aceitos nesses hospitais?",
    answer:
      "Não verificamos convênios. Confirme a cobertura do seu plano com cada instituição antes de decidir.",
  },
  {
    question: "Este guia é uma recomendação médica?",
    answer:
      "Não. É um inventário verificado das entidades de saúde citadas nas fontes documentadas do bairro, com fonte datada em cada linha.",
  },
];

export default function SaudePage() {
  return <GuiaPage guia={guia} faq={FAQ_ITEMS} />;
}
