'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Lead {
  id: string;
  full_name: string;
  phone: string;
  location: string;
  product_interest: 'internet' | 'tv_online' | 'box_android' | 'combo';
  status: 'novo' | 'qualificado' | 'proposta' | 'fechado' | 'perdido';
  notes: string;
  created_at: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    location: '',
    product_interest: 'combo' as 'internet' | 'tv_online' | 'box_android' | 'combo',
    notes: ''
  });

  const supabase = createClient();
  const TARGET_GOAL = 150;

  // Carregar leads do Supabase com tratamento defensivo contra crashes
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro na consulta Supabase:', error);
        setFetchError(error.message);
      } else if (data) {
        setLeads(data as Lead[]);
      }
    } catch (err: unknown) {
      console.error('Exceção capturada ao carregar leads:', err);
      setFetchError('Não foi possível estabelecer ligação à base de dados. Verifica as variáveis de ambiente.');
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Adicionar Lead vindo do WhatsApp
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('leads').insert([
        {
          ...formData,
          status: 'novo',
        }
      ]);

      if (error) {
        alert(`Erro ao guardar lead: ${error.message}`);
      } else {
        setShowModal(false);
        setFormData({ full_name: '', phone: '', location: '', product_interest: 'combo', notes: '' });
        fetchLeads();
      }
    } catch (err: unknown) {
      alert('Erro inesperado ao criar lead.');
      console.error(err);
    }
  };

  // Atualizar Estado do Funil
  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    try {
      const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', id);
      if (error) {
        alert(`Erro ao atualizar estado: ${error.message}`);
      } else {
        fetchLeads();
      }
    } catch (err: unknown) {
      console.error('Erro ao atualizar estado:', err);
    }
  };

  // Métricas de Progresso
  const totalLeads = leads.length;
  const closedDeals = leads.filter(l => l.status === 'fechado').length;
  const conversionRate = totalLeads > 0 ? ((closedDeals / totalLeads) * 100).toFixed(1) : '0';
  const progressPercent = Math.min(100, Math.round((closedDeals / TARGET_GOAL) * 100));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-white">
      {/* Resumo e Meta de 150 Clientes */}
      <div className="bg-[#082B49] border border-[#087CA5]/40 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#DFF7F8]">Gestão de Leads & Funil Comercial</h1>
            <p className="text-sm text-[#39B8C9]">Acompanhamento da Meta Comercial Quadra Festiva 2026</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#39B8C9] hover:bg-[#DFF7F8] text-[#082B49] font-bold py-2 px-4 rounded-lg transition-all shadow-md"
          >
            + Registar Lead WhatsApp
          </button>
        </div>

        {/* Barra de Progresso Rumo à Meta */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-semibold">
            <span>Progresso da Meta: {closedDeals} / {TARGET_GOAL} Adesões Confirmadas</span>
            <span className="text-[#39B8C9]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#087CA5] to-[#39B8C9] h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Módulos de KPI Rápidos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#087CA5]/10 p-4 rounded-lg border border-[#087CA5]/20">
            <p className="text-xs text-gray-300">Total Leads</p>
            <p className="text-2xl font-bold">{totalLeads}</p>
          </div>
          <div className="bg-[#087CA5]/10 p-4 rounded-lg border border-[#087CA5]/20">
            <p className="text-xs text-gray-300">Em Negociação</p>
            <p className="text-2xl font-bold">
              {leads.filter(l => ['qualificado', 'proposta'].includes(l.status)).length}
            </p>
          </div>
          <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30">
            <p className="text-xs text-emerald-300">Clientes Fechados</p>
            <p className="text-2xl font-bold text-emerald-400">{closedDeals}</p>
          </div>
          <div className="bg-[#087CA5]/10 p-4 rounded-lg border border-[#087CA5]/20">
            <p className="text-xs text-gray-300">Taxa de Conversão</p>
            <p className="text-2xl font-bold text-[#39B8C9]">{conversionRate}%</p>
          </div>
        </div>
      </div>

      {/* Alerta de erro de ligação se existir */}
      {fetchError && (
        <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-xl text-red-200 text-sm">
          <strong>Atenção:</strong> {fetchError}
        </div>
      )}

      {/* Tabela de Leads */}
      <div className="bg-[#082B49] border border-[#087CA5]/40 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-[#087CA5]/30 flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#DFF7F8]">Contactos Recebidos</h2>
          <button 
            onClick={fetchLeads}
            className="text-xs text-[#39B8C9] hover:text-[#DFF7F8] underline"
          >
            Atualizar dados
          </button>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-400">A carregar leads do Supabase...</div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            {fetchError ? 'Não foi possível carregar a lista de leads.' : 'Nenhum lead registado ainda.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#087CA5]/30 bg-[#087CA5]/20 text-xs text-[#DFF7F8] uppercase">
                  <th className="p-3">Nome</th>
                  <th className="p-3">Contacto</th>
                  <th className="p-3">Localização</th>
                  <th className="p-3">Interesse</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#087CA5]/20 text-sm">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#087CA5]/10 transition-colors">
                    <td className="p-3 font-semibold">{lead.full_name}</td>
                    <td className="p-3">{lead.phone}</td>
                    <td className="p-3">{lead.location}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[#087CA5]/30 text-[#39B8C9]">
                        {lead.product_interest.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                        className="bg-[#082B49] border border-[#087CA5] text-xs rounded px-2 py-1 text-white focus:ring-1 focus:ring-[#39B8C9]"
                      >
                        <option value="novo">Novo</option>
                        <option value="qualificado">Qualificado</option>
                        <option value="proposta">Proposta</option>
                        <option value="fechado">Fechado (Cliente)</option>
                        <option value="perdido">Perdido</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2 py-1 rounded transition-colors"
                      >
                        WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal para Adicionar Lead */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-[#082B49] border border-[#087CA5] rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-[#DFF7F8]">Novo Lead WhatsApp</h3>
            <form onSubmit={handleCreateLead} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300">Nome do Contacto</label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full bg-[#082B49] border border-[#087CA5] rounded p-2 text-sm mt-1 focus:outline-none focus:ring-1 focus:ring-[#39B8C9]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300">Telefone / WhatsApp</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+244..."
                  className="w-full bg-[#082B49] border border-[#087CA5] rounded p-2 text-sm mt-1 focus:outline-none focus:ring-1 focus:ring-[#39B8C9]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300">Bairro / Localização</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#082B49] border border-[#087CA5] rounded p-2 text-sm mt-1 focus:outline-none focus:ring-1 focus:ring-[#39B8C9]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300">Serviço Pretendido</label>
                <select
                  value={formData.product_interest}
                  onChange={(e) => setFormData({ ...formData, product_interest: e.target.value as 'internet' | 'tv_online' | 'box_android' | 'combo' })}
                  className="w-full bg-[#082B49] border border-[#087CA5] rounded p-2 text-sm mt-1 focus:outline-none focus:ring-1 focus:ring-[#39B8C9]"
                >
                  <option value="combo">Internet + TV + Box</option>
                  <option value="internet">Apenas Internet</option>
                  <option value="tv_online">Apenas TV Online</option>
                  <option value="box_android">Apenas Box Android</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300">Notas</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#082B49] border border-[#087CA5] rounded p-2 text-sm mt-1 focus:outline-none focus:ring-1 focus:ring-[#39B8C9]"
                  rows={2}
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
                  Guardar Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
