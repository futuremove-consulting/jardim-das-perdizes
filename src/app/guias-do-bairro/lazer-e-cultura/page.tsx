import { buildPageMetadata } from "@/lib/seo/metadata";
import { GUIAS } from "@/data/guias";
import GuiaPage from "@/components/content/GuiaPage";
import type { FaqItem } from "@/lib/seo/schemas";

const guia = GUIAS["lazer-e-cultura"];

export const metadata = buildPageMetadata({
  title: guia.metaTitle,
  description: guia.metaDescription,
  path: `/guias-do-bairro/${guia.slug}/`,
});

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "O que fazer no Jardim das Perdizes?",
    answer:
      "O parque central (mais de 45 mil m²) é o coração do lazer, com obras de Tomie Ohtake e Frans Krajcberg. No entorno há SESC Pompeia, Memorial da América Latina, Nubank Parque e Parque da Água Branca.",
  },
  {
    question: "O parque é aberto a visitantes?",
    answer:
      "O parque é público, segundo a Prefeitura de São Paulo. Regras de acesso, horários e acessibilidade devem ser confirmados na fonte municipal antes da visita.",
  },
  {
    question: "A programação cultural é frequente?",
    answer:
      "A página oficial cita a programação 'JP Experience', com eventos para famílias e pets. A agenda muda — verifique as datas atuais na fonte oficial.",
  },
];

export default function LazerCulturaPage() {
  return <GuiaPage guia={guia} faq={FAQ_ITEMS} />;
}
