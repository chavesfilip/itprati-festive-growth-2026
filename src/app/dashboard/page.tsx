'use client';

import Link from 'next/link';

export default function DashboardHome() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-white">
      <div className="bg-[#082B49] border border-[#087CA5]/40 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-[#DFF7F8]">iTpraTi Growth Control Center</h1>
        <p className="text-sm text-[#39B8C9] mt-1">Campanha Quadra Festiva 2026 — A festa acontece melhor ligada!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/dashboard/leads" className="bg-[#082B49] border border-[#087CA5]/40 hover:border-[#39B8C9] rounded-xl p-6 shadow-lg transition-all block">
          <h2 className="text-xl font-bold text-[#DFF7F8]">Leads & Funil</h2>
          <p className="text-xs text-gray-300 mt-2">Gestão de contactos do WhatsApp e meta de 150 clientes.</p>
        </Link>

        <Link href="/dashboard/referrals" className="bg-[#082B49] border border-[#087CA5]/40 hover:border-[#39B8C9] rounded-xl p-6 shadow-lg transition-all block">
          <h2 className="text-xl font-bold text-[#DFF7F8]">Indicações</h2>
          <p className="text-xs text-gray-300 mt-2">Programa de promotores e prémios da Quadra Festiva.</p>
        </Link>

        <Link href="/dashboard/calendar" className="bg-[#082B49] border border-[#087CA5]/40 hover:border-[#39B8C9] rounded-xl p-6 shadow-lg transition-all block">
          <h2 className="text-xl font-bold text-[#DFF7F8]">Calendário Editorial</h2>
          <p className="text-xs text-gray-300 mt-2">Acompanhamento das 5 fases de publicação e conteúdo.</p>
        </Link>

        <Link href="/dashboard/financial" className="bg-[#082B49] border border-[#087CA5]/40 hover:border-[#39B8C9] rounded-xl p-6 shadow-lg transition-all block">
          <h2 className="text-xl font-bold text-[#DFF7F8]">Financeiro & Orçamento</h2>
          <p className="text-xs text-gray-300 mt-2">Controlo da verba mensal de 200.000 Kz e cálculo CAC.</p>
        </Link>
      </div>
    </div>
  );
}
