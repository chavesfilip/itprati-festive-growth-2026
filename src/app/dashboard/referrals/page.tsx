'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Referral {
  id: string;
  promoter_name: string;
  promoter_phone: string;
  referred_name: string;
  referred_phone: string;
  status: 'pendente' | 'convertido' | 'premiado';
  created_at: string;
}

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    promoter_name: '',
    promoter_phone: '',
    referred_name: '',
    referred_phone: '',
  });

  const supabase = createClient();

  const fetchReferrals = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setReferrals(data as Referral[]);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchReferrals();
  }, [fetchReferrals]);

  const handleCreateReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('referrals').insert([
      {
        ...formData,
        status: 'pendente',
      }
    ]);

    if (!error) {
      setShowModal(false);
      setFormData({ promoter_name: '', promoter_phone: '', referred_name: '', referred_phone: '' });
      fetchReferrals();
    }
  };

  const handleStatusChange = async (id: string, newStatus: Referral['status']) => {
    await supabase.from('referrals').update({ status: newStatus }).eq('id', id);
    fetchReferrals();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-white">
      <div className="bg-[#082B49] border border-[#087CA5]/40 rounded-xl p-6 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#DFF7F8]">Programa de Indicações & Concurso</h1>
          <p className="text-sm text-[#39B8C9]">Gestão de clientes promotores e conversões da Quadra Festiva</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#39B8C9] hover:bg-[#DFF7F8] text-[#082B49] font-bold py-2 px-4 rounded-lg transition-all"
        >
          + Registar Indicação
        </button>
      </div>

      <div className="bg-[#082B49] border border-[#087CA5]/40 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-[#087CA5]/30">
          <h2 className="text-lg font-bold text-[#DFF7F8]">Registo de Promotores e Indicados</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-400">A carregar indicações...</div>
        ) : referrals.length === 0 ? (
          <div className="p-8 text-center text-gray-400">Nenhuma indicação registada.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#087CA5]/30 bg-[#087CA5]/20 text-xs text-[#DFF7F8] uppercase">
                  <th className="p-3">Promotor (Cliente)</th>
                  <th className="p-3">Contacto Promotor</th>
                  <th className="p-3">Indicado (Novo)</th>
                  <th className="p-3">Contacto Indicado</th>
                  <th className="p-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#087CA5]/20 text-sm">
                {referrals.map((ref) => (
                  <tr key={ref.id} className="hover:bg-[#087CA5]/10 transition-colors">
                    <td className="p-3 font-semibold">{ref.promoter_name}</td>
                    <td className="p-3">{ref.promoter_phone}</td>
                    <td className="p-3">{ref.referred_name}</td>
                    <td className="p-3">{ref.referred_phone}</td>
                    <td className="p-3">
                      <select
                        value={ref.status}
                        onChange={(e) => handleStatusChange(ref.id, e.target.value as Referral['status'])}
                        className="bg-[#082B49] border border-[#087CA5] text-xs rounded px-2 py-1 text-white focus:ring-1 focus:ring-[#39B8C9]"
                      >
                        <option value="pendente">Pendente</option>
                        <option value="convertido">Convertido</option>
                        <option value="premiado">Premiado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-[#082B49] border border-[#087CA5] rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-[#DFF7F8]">Nova Indicação</h3>
            <form onSubmit={handleCreateReferral} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300">Nome do Promotor</label>
                <input
                  type="text"
                  required
                  value={formData.promoter_name}
                  onChange={(e) => setFormData({ ...formData, promoter_name: e.target.value })}
                  className="w-full bg-[#082B49] border border-[#087CA5] rounded p-2 text-sm mt-1 focus:outline-none focus:ring-1 focus:ring-[#39B8C9]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300">Telefone do Promotor</label>
                <input
                  type="text"
                  required
                  value={formData.promoter_phone}
                  onChange={(e) => setFormData({ ...formData, promoter_phone: e.target.value })}
                  className="w-full bg-[#082B49] border border-[#087CA5] rounded p-2 text-sm mt-1 focus:outline-none focus:ring-1 focus:ring-[#39B8C9]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300">Nome do Indicado</label>
                <input
                  type="text"
                  required
                  value={formData.referred_name}
                  onChange={(e) => setFormData({ ...formData, referred_name: e.target.value })}
                  className="w-full bg-[#082B49] border border-[#087CA5] rounded p-2 text-sm mt-1 focus:outline-none focus:ring-1 focus:ring-[#39B8C9]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300">Telefone do Indicado</label>
                <input
                  type="text"
                  required
                  value={formData.referred_phone}
                  onChange={(e) => setFormData({ ...formData, referred_phone: e.target.value })}
                  className="w-full bg-[#082B49] border border-[#087CA5] rounded p-2 text-sm mt-1 focus:outline-none focus:ring-1 focus:ring-[#39B8C9]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm rounded bg-gray-700 hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded bg-[#39B8C9] hover:bg-[#DFF7F8] text-[#082B49] font-bold"
                >
                  Guardar Indicação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
