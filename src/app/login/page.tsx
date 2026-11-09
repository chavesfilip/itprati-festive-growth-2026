'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message === 'Invalid login credentials' 
        ? 'Credenciais inválidas. Verifica o e-mail e a palavra-passe.' 
        : error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#082B49] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#DFF7F8]">
          iTpraTi Growth Control Center
        </h2>
        <p className="mt-2 text-sm text-[#39B8C9]">
          Campanha Quadra Festiva 2026 — A festa acontece melhor ligada!
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#087CA5]/10 border border-[#087CA5]/30 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 backdrop-blur-md">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded text-center">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#DFF7F8]">
                E-mail Corporativo
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="utilizador@itprati.ao"
                  className="w-full px-3 py-2 bg-[#082B49] border border-[#087CA5] rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#39B8C9]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#DFF7F8]">
                Palavra-passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#082B49] border border-[#087CA5] rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-[#39B8C9]"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-[#082B49] bg-[#39B8C9] hover:bg-[#DFF7F8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#39B8C9] transition-all disabled:opacity-50"
              >
                {loading ? 'A autenticar...' : 'Entrar no Sistema'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
