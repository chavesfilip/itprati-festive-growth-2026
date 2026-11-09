'use client';

export default function CalendarPage() {
  const phases = [
    { name: 'Fase 1 — Preparar o terreno', dates: '4 a 15 Nov', theme: 'Este Natal, a tua casa merece estar mais ligada.' },
    { name: 'Fase 2 — Aquecimento comercial', dates: '16 a 30 Nov', theme: 'Prepara a tua casa para receber o Natal.' },
    { name: 'Fase 3 — Conversão máxima', dates: '1 a 15 Dez', theme: 'Este Natal, liga-te ao que realmente importa.' },
    { name: 'Fase 4 — Natal e proximidade', dates: '16 a 27 Dez', theme: 'O melhor presente é estarmos ligados.' },
    { name: 'Fase 5 — Ano Novo e última conversão', dates: '28 Dez a 5 Jan', theme: '2027 começa melhor conectado.' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-white">
      <div className="bg-[#082B49] border border-[#087CA5]/40 rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-[#DFF7F8]">Calendário Editorial & Fases da Campanha</h1>
        <p className="text-sm text-[#39B8C9]">Acompanhamento estruturado das 5 fases da campanha Quadra Festiva 2026</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phases.map((phase, idx) => (
          <div key={idx} className="bg-[#082B49] border border-[#087CA5]/40 rounded-xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#087CA5]/30 text-[#39B8C9]">
                {phase.dates}
              </span>
              <h2 className="text-lg font-bold text-[#DFF7F8] mt-3">{phase.name}</h2>
              <p className="text-sm text-gray-300 mt-2 italic">&ldquo;{phase.theme}&rdquo;</p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#087CA5]/30 flex justify-between items-center text-xs">
              <span className="text-emerald-400 font-semibold">● Ativo no Plano</span>
              <span className="text-gray-400">Ver Ficheiro CSV</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
