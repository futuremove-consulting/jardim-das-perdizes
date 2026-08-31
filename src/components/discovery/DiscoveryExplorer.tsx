"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AREA_RANGES,
  filterCondominiums,
  nearestByArea,
  type StageFilter,
} from "@/lib/discovery/filters";
import DiscoveryCard from "./DiscoveryCard";

const STAGE_OPTIONS: { id: StageFilter | "all"; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "ready", label: "Prontos para morar" },
  { id: "under-construction", label: "Em obras" },
  { id: "coming-soon", label: "Breve lançamento" },
];

const QUANTITY_OPTIONS = [2, 3, 4];

const TOTAL_PRODUCTS = 9;

/**
 * Editorial discovery explorer (spec: extracted/Especificação da camada de
 * descoberta, filtros e cards.md). Filters the fidelity-tested catalog by
 * stage, area and floor-plan attributes, discloses data-limitation
 * exclusions, and closes with the two-port conversion CTA.
 */
export default function DiscoveryExplorer() {
  const [stage, setStage] = useState<StageFilter | "all">("all");
  const [areaRangeId, setAreaRangeId] = useState<string | "all">("all");
  const [minSuites, setMinSuites] = useState<number | "all">("all");
  const [minDorms, setMinDorms] = useState<number | "all">("all");

  const filters = useMemo(
    () => ({
      ...(stage !== "all" ? { stage } : {}),
      ...(areaRangeId !== "all" ? { areaRangeId } : {}),
      ...(minSuites !== "all" ? { minSuites } : {}),
      ...(minDorms !== "all" ? { minDorms } : {}),
    }),
    [stage, areaRangeId, minSuites, minDorms]
  );

  const { matches, excluded } = useMemo(
    () => filterCondominiums(filters),
    [filters]
  );

  const hasFilters =
    stage !== "all" ||
    areaRangeId !== "all" ||
    minSuites !== "all" ||
    minDorms !== "all";

  // Empty-state target: midpoint of the selected bucket (capped), else ~100 m².
  const nearestTarget = useMemo(() => {
    const range = AREA_RANGES.find((r) => r.id === areaRangeId);
    if (!range) return 100;
    return range.max === Number.POSITIVE_INFINITY
      ? range.min + 50
      : Math.round((range.min + range.max) / 2);
  }, [areaRangeId]);

  const nearest = useMemo(
    () => (matches.length === 0 ? nearestByArea(nearestTarget) : []),
    [matches.length, nearestTarget]
  );

  const reset = () => {
    setStage("all");
    setAreaRangeId("all");
    setMinSuites("all");
    setMinDorms("all");
  };

  const pill = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
      active
        ? "border-brand bg-brand-soft text-brand"
        : "border-line text-ink-soft hover:border-brand hover:text-brand"
    }`;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold">Explorar por perfil</h2>
      <p className="mt-2 max-w-2xl text-sm text-ink-soft">
        Filtre os 9 produtos do bairro por estágio, área e plantas oficiais.
        Recortes sem dado publicado são sempre explicitados — nada é omitido.
      </p>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-ink">Estágio</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {STAGE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              aria-pressed={stage === opt.id}
              className={pill(stage === opt.id)}
              onClick={() => setStage(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-ink">Área privativa</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={areaRangeId === "all"}
            className={pill(areaRangeId === "all")}
            onClick={() => setAreaRangeId("all")}
          >
            Qualquer
          </button>
          {AREA_RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              aria-pressed={areaRangeId === r.id}
              className={pill(areaRangeId === r.id)}
              onClick={() => setAreaRangeId(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-wrap gap-4">
        <div>
          <label
            htmlFor="discovery-suites"
            className="text-sm font-medium text-ink"
          >
            Suítes (mínimo)
          </label>
          <select
            id="discovery-suites"
            value={minSuites === "all" ? "" : String(minSuites)}
            onChange={(e) =>
              setMinSuites(e.target.value === "" ? "all" : Number(e.target.value))
            }
            className="mt-1 block rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink"
          >
            <option value="">Qualquer</option>
            {QUANTITY_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="discovery-dorms"
            className="text-sm font-medium text-ink"
          >
            Dormitórios (mínimo)
          </label>
          <select
            id="discovery-dorms"
            value={minDorms === "all" ? "" : String(minDorms)}
            onChange={(e) =>
              setMinDorms(e.target.value === "" ? "all" : Number(e.target.value))
            }
            className="mt-1 block rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink"
          >
            <option value="">Qualquer</option>
            {QUANTITY_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={reset}
            className="self-end rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink-soft hover:border-brand hover:text-brand"
          >
            Limpar filtros
          </button>
        )}
      </div>

      <p aria-live="polite" className="mt-8 text-sm font-medium text-muted">
        {matches.length} de {TOTAL_PRODUCTS} produtos
      </p>

      {matches.length > 0 && (
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((c) => (
            <DiscoveryCard key={c.slug} condominium={c} />
          ))}
        </div>
      )}

      {matches.length === 0 && (
        <div className="mt-4 rounded-2xl border border-line bg-paper-secondary p-6">
          <p className="font-medium text-ink">
            Nenhum produto combina com esse recorte hoje.
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Isso não significa ausência de oportunidade: unidades específicas e
            condições atualizadas existem fora do catálogo público. Veja os
            perfis mais próximos ou envie seu recorte para o atendimento.
          </p>
          <h3 className="mt-6 text-sm font-semibold text-ink">
            Perfis mais próximos
          </h3>
          <div className="mt-3 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {nearest.map((c) => (
              <DiscoveryCard key={c.slug} condominium={c} />
            ))}
          </div>
        </div>
      )}

      {excluded.length > 0 && (
        <div className="mt-8 rounded-2xl border border-line p-6">
          <h3 className="text-sm font-semibold text-ink">
            Não avaliados neste recorte (limitação de dados)
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            {excluded.map((e) => (
              <li key={e.slug}>
                <span className="font-medium text-ink">{e.name}</span> —{" "}
                {e.reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {matches.length > 0 && (
        <div className="mt-10 rounded-2xl border border-line bg-paper-secondary p-6">
          <h3 className="text-lg font-semibold text-ink">
            Receba oportunidades compatíveis
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            Envie seu recorte (estágio, área, plantas) e receba unidades,
            condições e comparativos atualizados — com fonte e data, sem
            estoque fictício.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/#conversao"
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast hover:opacity-90"
            >
              Enviar meu recorte
            </Link>
            <Link
              href="/#conversao"
              className="rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink hover:border-brand hover:text-brand"
            >
              Falar agora com especialista
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}