import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { localBusinessSchema, breadcrumbSchema, crumb } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";
import { isDemo } from "@/lib/config";
import { CONDOMINIUMS, STATUS_LABELS } from "@/data/condominiums";
import { getCondoMedia } from "@/data/projectMedia";
import LeadForm from "@/components/conversion/LeadForm";
import WhatsAppCta from "@/components/conversion/WhatsAppCta";
import HeroSection from "@/components/sections/HeroSection";
import PropertyCard from "@/components/sections/PropertyCard";
import ContentSection from "@/components/sections/ContentSection";
import FeatureCard from "@/components/ui/FeatureCard";
import SectionTable from "@/components/ui/SectionTable";
import ComparisonCard from "@/components/ui/ComparisonCard";
import EditorialGrid from "@/components/ui/EditorialGrid";

export const metadata = buildPageMetadata({
  title: "Jardim das Perdizes Broker — Guia, Dados e Imóveis do Bairro",
  description:
    "Broker independente especializado no Jardim das Perdizes, em Perdizes (São Paulo). Guias, dados verificados e consultoria para morar, investir, vender ou alugar no bairro.",
  path: "/",
});

const NEIGHBORHOOD_FEATURES = [
  {
    icon: "tree" as const,
    title: "Parque 45k m²",
    description: "Maior parque privado de São Paulo com esculturas de Tomie Ohtake, áreas de lazer e mata preservada.",
  },
  {
    icon: "train" as const,
    title: "Metrô 3 min",
    description: "Estação Perdizes (Linha 4-Amarela) a 3 minutos a pé. Fácil acesso a toda a cidade.",
  },
  {
    icon: "map" as const,
    title: "Bairro Planejado",
    description: "Bairro privado com infraestrutura completa, ruas arborizadas e segurança 24h.",
  },
  {
    icon: "school" as const,
    title: "Educação Premium",
    description: "Pré-colégios particulares, escolas técnicas e universidades renomadas nas proximidades.",
  },
  {
    icon: "hospital" as const,
    title: "Saúde de Referência",
    description: "Hospitais Albert Einstein, Sírio-Libanês e Samaritano a menos de 10 minutos.",
  },
  {
    icon: "shopping" as const,
    title: "Completo para o Dia a Dia",
    description: "Carrefour Market, padarias, restaurantes, farmácias e serviços essenciais.",
  },
];

const CONDO_COMPARE = [
  {
    title: "Sequoia",
    items: [
      { icon: "ruler" as const, label: "Metragem", value: "121–175 m²" },
      { icon: "bed" as const, label: "Quartos", value: "3–4" },
      { icon: "bath" as const, label: "Suítes", value: "1–2" },
      { icon: "car" as const, label: "Vagas", value: "2" },
    ],
  },
  {
    title: "Reserva Figueiras",
    items: [
      { icon: "ruler" as const, label: "Metragem", value: "165–188 m²" },
      { icon: "bed" as const, label: "Quartos", value: "4" },
      { icon: "bath" as const, label: "Suítes", value: "2–3" },
      { icon: "car" as const, label: "Vagas", value: "3" },
    ],
    highlight: true,
  },
  {
    title: "Bosque Pitangueiras",
    items: [
      { icon: "ruler" as const, label: "Metragem", value: "79–136 m²" },
      { icon: "bed" as const, label: "Quartos", value: "2–3" },
      { icon: "bath" as const, label: "Suítes", value: "1–3" },
      { icon: "car" as const, label: "Vagas", value: "1–2" },
    ],
  },
];

export default function Home() {
  const schema = JSON.stringify(localBusinessSchema());

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />

      {isDemo() && (
        <p className="container-page mt-4 inline-block rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm text-amber-800">
          Modo demonstração — conteúdo de exemplo exibido sem banco de dados.
        </p>
      )}

      <HeroSection
        headline="Jardim das Perdizes
Guia, dados e imóveis verificados"
        subhead="Broker independente especializado no bairro. Guias, dados e imóveis verificados — com fonte e data — para morar, investir, vender ou alugar com informação certa."
      />

      {/* Diferenciais do Bairro */}
      <ContentSection eyebrow="O bairro" title="Por que escolher Jardim das Perdizes?">
        <p>
          Localizado no coração de Perdizes, o Jardim das Perdizes é o maior
          bairro privado de São Paulo. Com 45.000 m² de área verde, oferece
          qualidade de vida única na zona oeste, combinando infraestrutura
          completa, segurança e proximidade com as principais vias da cidade.
        </p>
        <p>
          O bairro é servido pela Linha 4-Amarela do Metrô (Estação Perdizes),
          fica a poucos minutos dos hospitais Albert Einstein e Sírio-Libanês, e
          conta comércio e serviços completos para o dia a dia.
        </p>
      </ContentSection>

      {/* Grid de Features com Ícones */}
      <section className="container-page pb-12 md:pb-16">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          Diferenciais do bairro
        </h2>
        <EditorialGrid columns={3} className="mt-6">
          {NEIGHBORHOOD_FEATURES.map((f) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.description}
            />
          ))}
        </EditorialGrid>
      </section>

      {/* Intenções */}
      <section className="bg-paper-secondary py-12 md:py-16">
        <div className="container-page">
          <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            Escolha sua intenção
          </h2>
          <EditorialGrid columns={2} className="mt-6">
            <Link
              href="/para-morar/"
              className="group rounded-2xl border border-line bg-surface p-6 transition-all hover:border-brand hover:shadow-lg"
            >
              <div className="mb-3 inline-flex rounded-xl bg-brand-soft p-2.5 text-brand">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-ink">Morar</h3>
              <p className="mt-2 text-sm text-ink-soft">Avaliar bairro, condomínio, rotina e custo para comprar o imóvel em que você vai viver.</p>
              <span className="mt-3 inline-block text-sm font-medium text-brand">Explorar →</span>
            </Link>
            <Link
              href="/para-investir/"
              className="group rounded-2xl border border-line bg-surface p-6 transition-all hover:border-brand hover:shadow-lg"
            >
              <div className="mb-3 inline-flex rounded-xl bg-brand-soft p-2.5 text-brand">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-ink">Investir</h3>
              <p className="mt-2 text-sm text-ink-soft">Comprar para renda (locação) ou para revender — com dados, custos, cenários e riscos.</p>
              <span className="mt-3 inline-block text-sm font-medium text-brand">Explorar →</span>
            </Link>
            <Link
              href="/venda-ou-alugue/"
              className="group rounded-2xl border border-line bg-surface p-6 transition-all hover:border-brand hover:shadow-lg"
            >
              <div className="mb-3 inline-flex rounded-xl bg-brand-soft p-2.5 text-brand">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-ink">Venda ou Alugue</h3>
              <p className="mt-2 text-sm text-ink-soft">Quero vender ou alugar o meu imóvel — avaliação com método, não com promessa.</p>
              <span className="mt-3 inline-block text-sm font-medium text-brand">Explorar →</span>
            </Link>
            <Link
              href="/para-trabalhar/"
              className="group rounded-2xl border border-line bg-surface p-6 transition-all hover:border-brand hover:shadow-lg"
            >
              <div className="mb-3 inline-flex rounded-xl bg-brand-soft p-2.5 text-brand">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-ink">Trabalhar</h3>
              <p className="mt-2 text-sm text-ink-soft">Salas comerciais (TIME Office) e lajes corporativas (TIME Corporate) para comprar ou alugar.</p>
              <span className="mt-3 inline-block text-sm font-medium text-brand">Explorar →</span>
            </Link>
          </EditorialGrid>
        </div>
      </section>

      {/* Comparação de Condomínios */}
      <ContentSection eyebrow="Os empreendimentos" title="Compare os condomínios do bairro">
        <p>
          Cada condomínio do Jardim das Perdizes foi projetado para um perfil
          específico. Compare metragem, número de quartos e vagas para encontrar
          o imóvel ideal para você.
        </p>
      </ContentSection>

      <section className="container-page pb-12 md:pb-16">
        <EditorialGrid columns={3}>
          {CONDO_COMPARE.map((condo) => (
            <ComparisonCard
              key={condo.title}
              title={condo.title}
              items={condo.items}
              highlight={condo.highlight}
            />
          ))}
        </EditorialGrid>
      </section>

      {/* Tabela de Dados do Bairro */}
      <section className="bg-paper-secondary py-12 md:py-16">
        <div className="container-page">
          <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            Dados do bairro
          </h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <SectionTable
              caption="Infraestrutura"
              rows={[
                { label: "Área total", value: "45.000 m²" },
                { label: "Torres residenciais", value: "12" },
                { label: "Unidades por torre", value: "~60" },
                { label: "Área verde preservada", value: "60%", highlight: true },
              ]}
            />
            <SectionTable
              caption="Localização"
              rows={[
                { label: "Metrô", value: "Estação Perdizes (3 min)" },
                { label: "Marginal Tietê", value: "5 min" },
                { label: "Av. Sumaré", value: "2 min" },
                { label: "Hospital Einstein", value: "8 min", highlight: true },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Cards de Condomínios */}
      <section className="container-page py-12 md:py-16">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          Condomínios do bairro
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CONDOMINIUMS.map((c) => {
            const media = getCondoMedia(c.slug);
            return (
              <PropertyCard
                key={c.slug}
                image={media?.hero}
                imageAlt={media?.heroAlt}
                title={c.name}
                badge={STATUS_LABELS[c.deliveryStatus]}
                priceLabel={
                  c.deliveryStatus === "coming-soon"
                    ? "Lançamento"
                    : "Sob Consulta"
                }
                specs={[
                  { label: "Área", value: `${c.areaMin}–${c.areaMax} m²` },
                  ...(c.parking
                    ? [{ label: "Vagas", value: c.parking }]
                    : []),
                ]}
                href={`/condominios/${c.slug}/`}
              />
            );
          })}
        </div>
      </section>

      {/* Conversão */}
      <section id="conversao" className="scroll-mt-8 border-t border-line bg-paper-secondary py-12 md:py-16">
        <div className="container-page">
          <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            Encontrou o que procura?
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Envie sua solicitação em 4 passos e receba um retorno direcionado —
            ou fale agora com um especialista local pelo WhatsApp.
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <LeadForm source={{ page: "/" }} />
            <div className="rounded-2xl border border-line bg-paper p-6 lg:max-w-xs">
              <h3 className="text-sm font-semibold text-ink">
                Prefere falar agora?
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                Atendimento direto, sem formulário, com mensagem já preenchida
                conforme o seu objetivo.
              </p>
              <div className="mt-4">
                <WhatsAppCta source={{ page: "/" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
