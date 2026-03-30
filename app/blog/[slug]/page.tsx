import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { posts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — claudje`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://claudje.com/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "claudje",
      url: "https://claudje.com",
    },
    publisher: {
      "@type": "Organization",
      name: "claudje",
      url: "https://claudje.com",
      logo: "https://claudje.com/favicon.svg",
    },
  };

  return (
    <>
      <Header />

      <section className="bg-brown px-6 py-16 text-text-on-dark lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="text-sm text-text-on-dark-muted transition-colors hover:text-text-on-dark"
          >
            &larr; All posts
          </Link>
          <h1 className="mt-4 font-heading text-3xl font-light tracking-tight md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-text-on-dark-muted">
            {new Date(post.date).toLocaleDateString("en-US", {
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
          <p className="font-heading text-xl text-brown">
            Want automated competitor intelligence?
          </p>
          <a
            href="/get-started"
            className="btn-shimmer mt-4 inline-block rounded-lg px-8 py-3 text-sm font-medium text-brown transition-colors"
          >
            Try claudje free for 14 days
          </a>
        </div>
      </section>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
