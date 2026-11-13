import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

// Layout for the public marketing site. The /admin dashboard lives outside this
// group, so it renders without the site header/footer.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="pt-0">{children}</main>
      <Footer />
    </>
  );
}
