import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "nextra-theme-docs/style.css";
import "./globals.css";
import Logo from "./logo";

export const metadata: Metadata = {
  title: "Nextra 4",
  description: "Nextra 4 is here.",
};

const banner = <Banner storageKey="some-key">Documentation coming soon.</Banner>;
const footer = <Footer>MIT {new Date().getFullYear()} © Ridge Web Components.</Footer>;

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          banner={banner}
          navbar={
            <Navbar
              logo={<Logo />}
              projectLink="https://github.com/billymcdowell/ridge-ui"
            />
          }
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/billymcdowell/ridge-ui/tree/main/docs"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1, autoCollapse: true }}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
