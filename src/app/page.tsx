"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { translations } from "../components/translation";

export default function Home() {
  const { language } = useLanguage();

  const t = translations[language];

  return (
    <main className="flex-1 bg-[var(--background)]">
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          {/* Brand */}
          <p className="mb-4 text-sm font-medium tracking-[0.3em] text-[var(--primary)]">
            ARKAN
          </p>

          {/* Title */}
          <h1 className="text-5xl font-bold leading-tight text-[var(--foreground)] md:text-7xl">
            {t.home.title}
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            {t.home.description}
          </p>

          {/* Actions */}
          <div className="mt-10 flex justify-center gap-4">
            <button className="rounded-md bg-[var(--primary)] px-7 py-3 font-medium text-white transition hover:opacity-90">
              {t.home.shopNow}
            </button>

            <button className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-7 py-3 font-medium text-[var(--foreground)] transition hover:opacity-80">
              {t.home.discover}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}