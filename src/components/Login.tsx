import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from '../types';
import { API_BASE_URL } from '../config/constants';

interface LoginProps {
    setUser: (user: User) => void;
}

export function Login({ setUser }: LoginProps) {
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setUser(response.data.user);
                navigate('/dashboard');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transform -skew-y-6"></div>
                    <div className="relative px-8 pt-8 pb-6">
                        <div className="text-center">
                            <img src="//logotyp.us/file/indian-premier-league.svg" className='w-4/5 h-4/5' alt="Indian Premier League"/><a href="//logotyp.us/logo/indian-premier-league"></a>
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
                            <p className="text-blue-100">Sign in to access your team store</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="px-8 py-6">
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Email</label>
                            <input
                                type="email"
                                ref={emailRef}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Password</label>
                            <input
                                type="password"
                                ref={passwordRef}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                        <div className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-500 hover:text-blue-600 font-semibold">
                                Register now
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}