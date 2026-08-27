"use client";

import { useEffect } from "react";
import type { ToolGuide } from "../app/tools/guides";

type ToolGuideModalProps = {
  guide: ToolGuide | null;
  onClose: () => void;
};

export default function ToolGuideModal({
  guide,
  onClose,
}: ToolGuideModalProps) {
  useEffect(() => {
    if (!guide) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guide, onClose]);

  if (!guide) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/85 px-4 py-6 backdrop-blur-md sm:px-6 sm:py-10"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-purple-500/30 bg-[#0b0610] shadow-[0_0_80px_rgba(168,85,247,0.25)]">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-purple-700/20 blur-[130px]" />
        <div className="pointer-events-none absolute -right-40 top-40 h-[420px] w-[420px] rounded-full bg-fuchsia-700/10 blur-[140px]" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Sulje opas"
          className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/30 bg-black/40 text-xl font-black text-purple-100 transition hover:border-fuchsia-400/60 hover:bg-purple-500/10 hover:text-white"
        >
          ×
        </button>

        <div className="relative z-10 p-6 sm:p-9 lg:p-12">
          <div className="flex flex-col gap-8 border-b border-purple-500/15 pb-9 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-300">
                  {guide.price}
                </span>

                <span className="text-[10px] font-black uppercase tracking-[0.30em] text-purple-400">
                  KOPOSQUAD CREATOR HUB
                </span>
              </div>

              <h2 className="mt-5 pr-12 text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {guide.name}
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
                {guide.description}
              </p>

              <a
                href={guide.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-xl border border-fuchsia-400/40 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-black text-white shadow-[0_0_25px_rgba(168,85,247,0.20)] transition hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(217,70,239,0.28)]"
              >
                {guide.downloadText} ↗
              </a>
            </div>

            <div className="flex shrink-0 justify-center lg:pr-8">
              <div className="flex h-36 w-36 items-center justify-center rounded-[28px] border border-purple-500/25 bg-purple-500/[0.06] p-7 shadow-[0_0_45px_rgba(168,85,247,0.12)] sm:h-44 sm:w-44">
                <img
                  src={guide.logoImage}
                  alt={`${guide.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="py-9">
            <p className="text-[10px] font-black uppercase tracking-[0.30em] text-fuchsia-300">
              Aloittelijan opas
            </p>

            <h3 className="mt-3 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
              {guide.guideTitle}
            </h3>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-400">
              {guide.guideDescription}
            </p>
          </div>

          <div className="space-y-4">
            {guide.steps.map((step, index) => (
              <div
                key={`${guide.id}-${index}`}
                className="group rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/[0.055] to-transparent p-5 transition hover:border-purple-400/35 hover:bg-purple-500/[0.075] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-500/10 text-xs font-black text-purple-300">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <h4 className="text-sm font-black uppercase tracking-wide text-white sm:text-base">
                      {step.title}
                    </h4>

                    <p className="mt-2 text-sm leading-7 text-gray-400">
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-fuchsia-500/20 bg-gradient-to-r from-purple-500/[0.10] to-fuchsia-500/[0.06] p-6 text-center sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.30em] text-fuchsia-300">
              Valmista
            </p>

            <h3 className="mt-3 text-2xl font-black uppercase text-white sm:text-3xl">
              {guide.name} on valmis striimaamiseen
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-400">
              Kun perusasetukset ovat kunnossa, voit seuraavaksi rakentaa omat
              skenet, overlayt, alertit ja muut kanavasi elementit.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl border border-purple-400/40 bg-purple-600 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-purple-500"
            >
              ← Takaisin työkaluihin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}