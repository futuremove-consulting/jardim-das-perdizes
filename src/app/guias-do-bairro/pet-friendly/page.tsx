import { buildPageMetadata } from "@/lib/seo/metadata";
import { GUIAS } from "@/data/guias";
import GuiaPage from "@/components/content/GuiaPage";
import type { FaqItem } from "@/lib/seo/schemas";

const guia = GUIAS["pet-friendly"];

export const metadata = buildPageMetadata({
  title: guia.metaTitle,
  description: guia.metaDescription,
  path: `/guias-do-bairro/${guia.slug}/`,
});

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "O parque aceita pets?",
    answer:
      "Sim. O artigo institucional cita bebedouros para pets no parque, e a programação JP Experience inclui eventos para famílias e pets. Regras específicas devem ser confirmadas na fonte municipal.",
  },
  {
    question: "Tem pet shop no bairro?",
    answer:
      "Sim. O portal Guia Jardim das Perdizes documenta Oito Patas Petshop e Retiro Pet no bairro, além de pet shop citado no artigo institucional do parque.",
  },
  {
    question: "Todos os condomínios aceitam pets?",
    answer:
      "Não verificamos regra por condomínio. Cada condomínio é independente e tem regras próprias — confirme na ficha de cada produto antes de decidir.",
  },
];

export default function PetFriendlyPage() {
  return <GuiaPage guia={guia} faq={FAQ_ITEMS} />;
}
