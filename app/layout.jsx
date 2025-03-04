import Header from "@/components/header";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/footer";
import Script from "next/script";

<Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "Armazém Girassol",
      "url": "https://www.armazemgirassol.com.br",
      "logo": "https://www.armazemgirassol.com.br/logo.png",
      "description": "Loja online de produtos naturais a granel, saudáveis e orgânicos.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Cruz de Malta, 1402 - loja 1",
        "addressLocality": "Charqueadas",
        "addressRegion": "RS",
        "postalCode": "96745-000",
        "addressCountry": "BR"
      },
    }),
  }}
/>

export const metadata = {
  title: "Armazém Girassol - Loja de Produtos Naturais a Granel",
  description:
    "Compre produtos naturais a granel no Armazém Girassol. Alimentos saudáveis, orgânicos e sustentáveis com entrega rápida e preços acessíveis.",
  keywords:
    "armazém girassol, loja de produtos naturais, produtos naturais a granel, alimentos saudáveis, orgânicos, loja online de produtos naturais",
  openGraph: {
    title: "Armazém Girassol - Loja de Produtos Naturais a Granel",
    description:
      "Explore nossa variedade de produtos naturais a granel com qualidade e preço justo. Entrega rápida e sustentável.",
    url: "https://www.armazemgirassol.com.br",
    siteName: "Armazém Girassol",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.ico", sizes: "16x16" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/favicon.ico" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Armazém Girassol" />
        <meta property="og:locale" content="pt_BR" />
        <link rel="canonical" href="https://www.armazemgirassol.com.br" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Script do ahrefs para verificar SEO */}
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="QhqewT5du5qmo+qCFSPa2A" async></script>
        {/* Script para verificar com google search console */}
        <meta name="google-site-verification" content="L256Y_zlY7fjeIPjXNWs1OLhZNjPK_xykZmGaxr_VI0" />
      </head>
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
