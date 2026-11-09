'use client';

export default function FinancialPage() {
  const budgetItems = [
    { category: 'Facebook e Instagram Ads', amount: '85.000 Kz', share: '42.5%' },
    { category: 'TikTok Ads', amount: '30.000 Kz', share: '15%' },
    { category: 'Criadores de conteúdo', amount: '30.000 Kz', share: '15%' },
    { category: 'Produção e edição', amount: '35.000 Kz', share: '17.5%' },
    { category: 'Reserva de otimização', amount: '20.000 Kz', share: '10%' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-white">
      <div className="bg-[#082B49] border border-[#087CA5]/40 rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-[#DFF7F8]">Dashboard Financeiro & Orçamento</h1>
        <p className="text-sm text-[#39B8C9]">Controlo mensal da verba de 200.000 Kz e CAC de referência</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#082B49] border border-[#087CA5]/40 rounded-xl p-6 shadow-lg">
          <p className="text-xs text-gray-300">Orçamento Mensal</p>
          <p className="text-3xl font-bold text-[#DFF7F8] mt-1">200.000 Kz</p>
          <span className="text-xs text-[#39B8C9] mt-2 block">Limite estrito por mês</span>
        </div>
        <div className="bg-[#082B49] border border-[#087CA5]/40 rounded-xl p-6 shadow-lg">
          <p className="text-xs text-gray-300">Meta de Clientes</p>
          <p className="text-3xl font-bold text-[#DFF7F8] mt-1">150 Clientes</p>
          <span className="text-xs text-emerald-400 mt-2 block">Novos aderentes confirmados</span>
        </div>
        <div className="bg-[#082B49] border border-[#087CA5]/40 rounded-xl p-6 shadow-lg">
          <p className="text-xs text-gray-300">CAC de Referência</p>
          <p className="text-3xl font-bold text-[#39B8C9] mt-1">2.667 Kz</p>
          <span className="text-xs text-gray-400 mt-2 block">Custo por aquisição estimado</span>
        </div>
      </div>

      <div className="bg-[#082B49] border border-[#087CA5]/40 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-[#087CA5]/30">
          <h2 className="text-lg font-bold text-[#DFF7F8]">Distribuição da Verba Mensal</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#087CA5]/30 bg-[#087CA5]/20 text-xs text-[#DFF7F8] uppercase">
                <th className="p-3">Categoria de Investimento</th>
                <th className="p-3">Valor Mensal</th>
                <th className="p-3">Percentagem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#087CA5]/20 text-sm">
              {budgetItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#087CA5]/10 transition-colors">
                  <td className="p-3 font-semibold">{item.category}</td>
                  <td className="p-3 text-[#39B8C9] font-bold">{item.amount}</td>
                  <td className="p-3">{item.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
