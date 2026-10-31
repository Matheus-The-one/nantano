import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getSession } from "@/lib/auth/server";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <>
      <Navbar signedIn={session !== null} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
