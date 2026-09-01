import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { BROKER } from "@/lib/config";

export const metadata = buildPageMetadata({
  title: "Privacidade e dados pessoais (LGPD)",
  description:
    "Como o Jardim das Perdizes Broker coleta, usa e protege seus dados: contato mínimo, finalidades, base legal, retenção e seus direitos pela LGPD.",
  path: "/privacidade/",
});

export default function PrivacyPage() {
  return (
    <section className="container-page py-12">
      <nav className="text-sm text-muted" aria-label="Você está em">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <span>Privacidade</span>
      </nav>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        Privacidade e dados pessoais
      </h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Este site pede o mínimo de dados necessário para retornar uma
        solicitação imobiliária. Esta página explica o que coletamos, por quê e
        como exercer seus direitos (Lei nº 13.709/2018 — LGPD).
      </p>

      <div className="mt-10 max-w-2xl space-y-8">
        <div>
          <h2 className="text-xl font-semibold">O que coletamos</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft">
            <li>
              Nome, WhatsApp, objetivo, prazo e melhor horário — informados por
              você no formulário de solicitação.
            </li>
            <li>
              A página de origem da solicitação (ex.: ficha de um condomínio) e
              filtros aplicados — para contextualizar o atendimento.
            </li>
            <li>
              Dados de navegação agregados (Google Analytics 4, com IP
              anonimizado) — para melhorar o conteúdo, não para anúncios.
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted">
            Não há cadastro, senha, dados sensíveis ou compartilhamento com
            portais de anúncios.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Para que usamos</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft">
            <li>Retornar a sua solicitação pelo WhatsApp no horário indicado.</li>
            <li>
              Preparar o atendimento com contexto (o que você procura, em qual
              estágio do bairro).
            </li>
            <li>
              Conteúdo promocional <strong>somente</strong> se você marcar a
              opção própria e separada do contato — e você pode retirar esse
              consentimento a qualquer momento.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Base legal e retenção</h2>
          <p className="mt-3 text-ink-soft">
            O tratamento se baseia no seu{" "}
            <strong>consentimento</strong> (art. 7º, I) dado ao enviar a
            solicitação. Guardamos os dados enquanto durar o atendimento ou até
            você pedir a exclusão; o registro é mantido por até 5 anos para
            fins de histórico e defesa legal, após o que é eliminado.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Seus direitos</h2>
          <p className="mt-3 text-ink-soft">
            Você pode pedir confirmação de tratamento, acesso, correção,
            anonimização, portabilidade, eliminação e informação sobre
            compartilhamentos. Basta escrever para{" "}
            <a
              href={`mailto:${BROKER.email}`}
              className="underline underline-offset-4 hover:text-brand"
            >
              {BROKER.email}
            </a>{" "}
            — respondemos em até 15 dias.
          </p>
        </div>

        <p className="text-xs text-muted">
          Última revisão: 01/09/2026. Encarregado de dados (DPO): {BROKER.email}
          . CRECI {BROKER.creci}.
        </p>
      </div>
    </section>
  );
}