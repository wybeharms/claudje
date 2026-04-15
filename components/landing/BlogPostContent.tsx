"use client";

import Link from "next/link";
import { useI18n } from "@/context/I18nContext";
import Header from "./Header";
import Footer from "./Footer";
import type { BlogPost } from "@/lib/blog";

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const { locale, messages } = useI18n();
  const t = messages.blog;

  return (
    <>
      <Header />

      <section className="bg-brown px-6 py-16 text-text-on-dark lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="text-sm text-text-on-dark-muted transition-colors hover:text-text-on-dark"
          >
            {t.allPosts}
          </Link>
          <h1 className="mt-4 font-heading text-3xl font-light tracking-tight md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-text-on-dark-muted">
            {new Date(post.date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {" "}· {post.readingTime}
          </p>
        </div>
      </section>

      <article className="bg-cream px-6 py-14 lg:px-8">
        <div
          className="prose-claudje mx-auto max-w-3xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <section className="bg-cream-dark px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-xl text-brown">{t.postCtaTitle}</p>
          <a
            href="/get-started"
            className="btn-shimmer mt-4 inline-block rounded-lg px-8 py-3 text-sm font-medium text-brown transition-colors"
          >
            {t.postCtaButton}
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
