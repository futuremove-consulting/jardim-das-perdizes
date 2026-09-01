import { buildPageMetadata } from "@/lib/seo/metadata";
import { GUIAS } from "@/data/guias";
import GuiaPage from "@/components/content/GuiaPage";
import type { FaqItem } from "@/lib/seo/schemas";

const guia = GUIAS.seguranca;

export const metadata = buildPageMetadata({
  title: guia.metaTitle,
  description: guia.metaDescription,
  path: `/guias-do-bairro/${guia.slug}/`,
});

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "O Jardim das Perdizes é seguro?",
    answer:
      "As fontes documentam segurança 24h, monitoramento e integração com o Muralha Paulista. O Muralha é uma política pública de integração de câmeras — não é garantia de ausência de crime. Sensação de segurança é subjetiva; verifique na visita.",
  },
  {
    question: "A segurança é do bairro ou do condomínio?",
    answer:
      "As duas coisas, em camadas: o bairro tem monitoramento e o Muralha Paulista; cada condomínio é independente e tem regras próprias. Os guias separam o que é atributo do bairro e o que é atributo de cada condomínio.",
  },
  {
    question: "O Muralha Paulista é exclusivo do bairro?",
    answer:
      "Não. É uma política pública do Governo de São Paulo que integra câmeras de usuários públicos e privados em todo o estado. O bairro participa, segundo a página oficial.",
  },
];

export default function SegurancaPage() {
  return <GuiaPage guia={guia} faq={FAQ_ITEMS} />;
}
