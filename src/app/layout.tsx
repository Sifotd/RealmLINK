import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WalletProviders } from "@/providers/WalletProviders";
import '@mysten/dapp-kit/dist/index.css';
import '../styles/dapp-kit-override.css';

export const metadata: Metadata = {
  title: "门票销售平台",
  description: "基于区块链的门票销售平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" data-theme="light">
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <WalletProviders>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </WalletProviders>
      </body>
    </html>
  );
}
