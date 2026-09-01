import { buildPageMetadata } from "@/lib/seo/metadata";
import { GUIAS } from "@/data/guias";
import GuiaPage from "@/components/content/GuiaPage";
import type { FaqItem } from "@/lib/seo/schemas";

const guia = GUIAS.escolas;

export const metadata = buildPageMetadata({
  title: guia.metaTitle,
  description: guia.metaDescription,
  path: `/guias-do-bairro/${guia.slug}/`,
});

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Quais escolas ficam perto do Jardim das Perdizes?",
    answer:
      "As fontes documentadas citam no entorno: Colégio Pentágono, Santa Marcelina, Colégio Batista Brasileiro, Sagrado Coração de Jesus e Colégio Américas, além de PUC-SP Perdizes, Mackenzie, FAU-USP e Senac Francisco Matarazzo. Cada indicação tem fonte datada na tabela acima.",
  },
  {
    question: "As distâncias até as escolas estão medidas?",
    answer:
      "Não. O acervo do projeto cita as instituições como próximas, mas não mede tempos a pé ou de carro. Antes de decidir, confirme a rota real na visita.",
  },
  {
    question: "Este guia é um ranking de escolas?",
    answer:
      "Não. É um inventário verificado das instituições citadas nas fontes institucionais e editoriais do bairro, com fonte datada em cada linha.",
  },
];

export default function EscolasPage() {
  return <GuiaPage guia={guia} faq={FAQ_ITEMS} />;
}
