import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { User } from './types';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { AddProduct } from './components/AddProduct';
import { teamThemes } from './config/teamThemes';

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if (token) {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        }
        setLoading(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                
                <header 
                    className="bg-white shadow-md"
                    style={user ? {
                        background: `linear-gradient(to right, ${teamThemes[user.team].gradientFrom}, ${teamThemes[user.team].gradientTo})`
                    } : undefined}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                {user && (
                                    <img 
                                        src={teamThemes[user.team].logo} 
                                        alt={`${user.team} logo`}
                                        className="h-10 w-10"
                                    />
                                )}
                                <h1 className="text-2xl font-bold text-white">
                                    IPL Fan Store
                                </h1>
                            </div>

                            <nav>
                                {user ? (
                                    <div className="flex items-center space-x-6">
                                        <span className="text-white">
                                            Welcome, {user.name}
                                        </span>
                                        <button
                                            onClick={handleLogout}
                                            className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-opacity-90 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-x-4">
                                        <a 
                                            href="/login"
                                            className="text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                            Login
                                        </a>
                                        <a
                                            href="/register"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Register
                                        </a>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                
                <main>
                    <Routes>
                        <Route 
                            path="/login" 
                            element={
                                !user ? (
                                    <Login setUser={setUser} />
                                ) : (
                                    <Navigate to="/dashboard" replace />
                                )
                            } 
                        />
                        <Route 
                            path="/register" 
                            element={
                                !user ? (
                                    <Register />
                                ) : (
                                    <Navigate to="/dashboard" replace />
                                )
                            } 
                        />
                        <Route 
                            path="/dashboard" 
                            element={
                                user ? (
                                    <Dashboard />
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            } 
                        />
                        <Route 
                            path="/add-product" 
                            element={
                                user ? (
                                    <AddProduct />
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            } 
                        />
                        <Route 
                            path="/" 
                            element={
                                <Navigate to={user ? "/dashboard" : "/login"} replace />
                            } 
                        />
                    </Routes>
                </main>

                
                <footer className="bg-white shadow-md mt-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="text-center text-gray-600">
                            <p>© 2024 IPL Fan Store. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;