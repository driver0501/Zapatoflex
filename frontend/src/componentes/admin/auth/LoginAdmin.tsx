'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulación de login para admin
        if (email === 'admin@zapatoflex.co' && password === 'admin123') {
            router.push('/admin');
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black uppercase tracking-tighter">ZapatoFlex</h1>
                    <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">Panel Administrativo</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-700 mb-2">Correo Electrónico</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                                placeholder="admin@zapatoflex.co"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-700 mb-2">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white font-black py-4 uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <LogIn size={16} /> Entrar al sistema
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                        Uso exclusivo para personal autorizado
                    </p>
                </div>
            </div>
        </div>
    );
}
