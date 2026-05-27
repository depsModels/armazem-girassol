import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { HardHat, Home, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import FeaturesSection from '@/components/home/FeaturesSection';

export const metadata: Metadata = {
  title: 'Sobre Nós | Armazém Girassol',
  description: 'Conheça a história do Armazém Girassol.',
};

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col min-h-[70vh]">
      <FeaturesSection />
      <Container className="w-full flex-1 flex flex-col">
        <div className="py-8 md:py-12 w-full flex-1 flex flex-col">
          {/* Page Header */}
          <div className="mb-8 w-full">
            <nav className="flex items-center text-sm text-gray-500 mb-2">
              <Link href="/" className="hover:text-amber-950 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="font-semibold text-amber-950">Sobre Nós</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-950 font-serif">
              Sobre Nós
            </h1>
            <p className="text-gray-500 mt-2 text-base">
              Conheça a história e a essência do Armazém Girassol.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center bg-[#FFFDF4] rounded-3xl border border-black/5 shadow-sm">
            <div className="w-24 h-24 bg-[#F5EED8] rounded-full flex items-center justify-center mb-6">
              <HardHat className="w-12 h-12 text-[#2E8B57] opacity-60" />
            </div>
            
            <h2 className="text-3xl font-serif font-bold text-amber-950 mb-4">
              Em Construção
            </h2>
            
            <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg">
              Estamos preparando uma página especial para contar a nossa história. Em breve, você poderá conhecer mais sobre a essência do Armazém Girassol.
            </p>
            
            <Link href="/">
              <Button className="py-6 px-10 text-lg rounded-full shadow-md bg-[#2E8B57] hover:bg-green-700 text-white font-bold transition-all border-none flex items-center gap-2">
                <Home className="w-5 h-5" />
                Voltar para o Início
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
