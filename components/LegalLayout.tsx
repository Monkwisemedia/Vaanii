import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="wrap legal">
        <p className="legal__updated mono">Last updated {updated}</p>
        <h1>{title}</h1>
        <div className="legal__body">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
