import { marked } from "marked";

// Renders a post body at build time. New posts are authored in the WYSIWYG
// editor and stored as HTML; older placeholder posts may still be Markdown.
// If the body already contains HTML tags we render it as-is; otherwise we treat
// it as Markdown and convert it.

marked.setOptions({ gfm: true, breaks: false });

function isHtml(body: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(body);
}

export function ArticleBody({ markdown }: { markdown: string }) {
  const body = markdown ?? "";
  const html = isHtml(body) ? body : (marked.parse(body, { async: false }) as string);
  return (
    <div
      className="article-body mx-auto max-w-[720px] text-[17px] leading-[1.75] text-ink/80"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
