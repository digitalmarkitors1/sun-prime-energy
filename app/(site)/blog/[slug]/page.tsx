import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { blogPosts, sortedPosts } from "@/data/blog";

type Params = { slug: string };

// Pre-render one static HTML file per post (required for `output: "export"`).
export function generateStaticParams(): Params[] {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const title = post.metaTitle || `${post.title} | Sunprime Energy Solutions`;
  const description = post.metaDescription || post.excerpt;
  const url = `${site.url}/blog/${post.slug}`;
  const image = post.ogImage || post.coverImage;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: site.name,
      title,
      description,
      url,
      locale: "en_IN",
      publishedTime: post.publishedAt,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

function formatDate(iso: string): string {
  // iso = "YYYY-MM-DD" — format without relying on locale/runtime Date quirks.
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  if (!y || !m || !d) return iso;
  return `${months[m - 1]} ${d}, ${y}`;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.slug}`;
  const related = sortedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.metaDescription || post.excerpt}
        url={url}
        image={post.ogImage || post.coverImage}
        datePublished={post.publishedAt}
        author={post.author}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Blog", url: `${site.url}/blog` },
          { name: post.title, url },
        ]}
      />

      {/* Header */}
      <Section tone="sky" size="default" className="pt-28 md:pt-32">
        <Container>
          <div className="mx-auto max-w-[720px]">
            <Reveal>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-[13px] text-ink/55 transition hover:text-amber"
              >
                <ArrowLeft size={14} /> All articles
              </Link>
            </Reveal>
            <Reveal>
              <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink/45">
                <span>{post.category}</span>
                <span aria-hidden className="h-px w-6 bg-ink/25" />
                <span>{post.readTime}</span>
              </div>
            </Reveal>
            <Reveal delay={0.05} as="h1" className="mt-5 text-balance text-[34px] font-semibold leading-[1.1] tracking-tight md:text-[44px]">
              {post.title}
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[13px] text-ink/55">
                {post.author} · {formatDate(post.publishedAt)}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Cover */}
      {post.coverImage && (
        <Section tone="paper" size="tight">
          <Container>
            <Reveal>
              <div className="relative mx-auto aspect-[16/9] w-full max-w-[920px] overflow-hidden rounded-lg bg-ink/5">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(min-width: 960px) 920px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* Body */}
      <Section tone="paper" size="default">
        <Container>
          <Reveal>
            <ArticleBody markdown={post.body} />
          </Reveal>
        </Container>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section tone="mist" size="default" className="border-t border-line">
          <Container>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink/45">
              More articles
            </h2>
            <ul className="mt-8 grid gap-y-10 gap-x-6 md:grid-cols-3">
              {related.map((a) => (
                <li key={a.slug}>
                  <Link href={`/blog/${a.slug}`} className="group block">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-ink/5">
                      <Image
                        src={a.coverImage}
                        alt={a.title}
                        fill
                        sizes="(min-width: 768px) 30vw, 90vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <h3 className="mt-4 text-balance text-[18px] font-semibold leading-snug tracking-tight">
                      {a.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <FinalCTA />
    </>
  );
}
