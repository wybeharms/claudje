import type { Metadata } from "next";
import BlogIndexContent from "@/components/landing/BlogIndexContent";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — claudje",
  description:
    "Practical guides on competitor monitoring, pricing intelligence, and competitive strategy for small and medium businesses.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — claudje",
    description:
      "Practical guides on competitor monitoring and competitive intelligence for SMBs.",
    url: "https://claudje.com/blog",
  },
};

export default function BlogIndex() {
  return <BlogIndexContent posts={posts} />;
}
