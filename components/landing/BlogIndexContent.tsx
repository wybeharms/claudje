"use client";

import Link from "next/link";
import { useI18n } from "@/context/I18nContext";
import Header from "./Header";
import Footer from "./Footer";
import type { BlogPost } from "@/lib/blog";

export default function BlogIndexContent({ posts }: { posts: BlogPost[] }) {
  const { locale, messages } = useI18n();
  const t = messages.blog;

  return (
    <>
      <Header />

      <section className="bg-brown px-6 py-16 text-text-on-dark lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl font-light tracking-tight md:text-5xl">
            {t.heroTitle}
          </h1>
          <p className="mt-4 text-text-on-dark-muted">{t.heroSubtitle}</p>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-10">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-border-warm bg-white p-6 transition-shadow hover:shadow-md"
              >
                <time className="text-xs font-medium tracking-wide text-text-muted uppercase">
                  {new Date(post.date).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {" "}· {post.readingTime}
                </time>
                <h2 className="mt-2 font-heading text-xl font-semibold text-brown group-hover:text-gold transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {post.description}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
