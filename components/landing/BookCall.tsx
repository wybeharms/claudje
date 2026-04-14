"use client";

import Image from "next/image";
import { useI18n } from "@/context/I18nContext";

export const BOOK_CALL_URL =
  process.env.NEXT_PUBLIC_BOOK_CALL_URL || "https://calendly.com/berend-claudje/30min";

export default function BookCall() {
  const { messages } = useI18n();
  const t = messages.bookCall;

  return (
    <section id="book-call" className="bg-cream-dark px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-border-warm bg-white p-8 shadow-sm md:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-5 h-24 w-24 overflow-hidden rounded-full ring-4 ring-gold/30">
              <Image
                src="/berend.jpg"
                alt="Berend Harms, co-founder of Claudje"
                fill
                sizes="96px"
                className="object-cover"
                priority={false}
              />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gold">
              {t.eyebrow}
            </span>
            <h2 className="mt-2 font-heading text-2xl text-text-primary md:text-3xl">
              {t.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-muted md:text-base">
              {t.body}
            </p>
            <a
              href={BOOK_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-brown"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              {t.cta}
            </a>
            <p className="mt-4 text-xs text-text-muted">{t.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
