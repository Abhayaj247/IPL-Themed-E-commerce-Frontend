import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

export function Register() {
    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userData = {
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            };

            const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);

            if (response.data.message === 'User registered successfully') {
                alert(`Registration successful! Your team is ${response.data.team}`);
                navigate('/login');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-600 transform -skew-y-6"></div>
                    <div className="relative px-8 pt-8 pb-6">
                        <div className="text-center">
                            <img src="//logotyp.us/file/indian-premier-league.svg" className='w-4/5 h-2/5' alt="Indian Premier League"/><a href="//logotyp.us/logo/indian-premier-league"></a>
                            <h2 className="text-3xl font-bold text-white mb-2">Join IPL Store</h2>
                            <p className="text-blue-100">Get assigned to your team and start shopping!</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleRegister} className="px-8 py-6">
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Name</label>
                            <input
                                type="text"
                                ref={nameRef}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Email</label>
                            <input
                                type="email"
                                ref={emailRef}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Password</label>
                            <input
                                type="password"
                                ref={passwordRef}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Create a password"
                                required
                            />
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg font-semibold shadow-md hover:from-purple-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                        <div className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-purple-500 hover:text-purple-600 font-semibold">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}