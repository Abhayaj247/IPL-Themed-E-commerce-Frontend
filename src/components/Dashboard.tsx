import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../types';
import { teamThemes } from '../config/teamThemes';
import { API_BASE_URL } from '../config/constants';

export function Dashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const theme = teamThemes[user.team];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/products`, {
                headers: { Authorization: token }
            });
           
            const teamProducts = response.data.filter((product: Product) => product.team === user.team);
            setProducts(teamProducts);
        } catch (error: any) {
            setError('');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center" style={{ backgroundColor: `${theme.secondary}15` }}>
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4" style={{ borderColor: theme.primary }}></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: `${theme.secondary}15` }}>
            
            <div 
                className="py-8 px-4 mb-8"
                style={{ 
                    background: `linear-gradient(to right, ${theme.gradientFrom}, ${theme.gradientTo})` 
                }}
            >
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-6">
                            <img 
                                src={theme.logo} 
                                alt={`${user.team} logo`} 
                                className="h-2/3 w-36"
                            />
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">
                                    {user.team} Fan Store
                                </h1>
                                <p className="text-white text-lg opacity-90">
                                    Exclusive {user.team} merchandise for true fans
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/add-product')}
                            className="px-6 py-3 bg-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                            style={{ color: theme.primary }}
                        >
                            Add New Product
                        </button>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="container mx-auto px-4 mb-8">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                </div>
            )}

            {/* Products grid */}
            <div className="container mx-auto px-4 pb-12">
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div 
                                key={product._id} 
                                className="relative group"
                            >
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 group-hover:shadow-xl">
                                    <div className="relative">
                                        <div className="relative pb-[100%]">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = 'https://via.placeholder.com/400?text=Product';
                                                }}
                                            />
                                        </div>
                                        <div 
                                            className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold"
                                            style={{ 
                                                backgroundColor: theme.primary,
                                                color: 'white'
                                            }}
                                        >
                                            {product.category}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2" style={{ color: theme.primary }}>
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                                        
                                        {product.sizes && (
                                            <div className="mb-4">
                                                <span className="text-sm font-medium text-gray-700 block mb-2">Available Sizes:</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {product.sizes.map((size) => (
                                                        <span 
                                                            key={size}
                                                            className="px-3 py-1 text-sm border rounded-full transition-colors"
                                                            style={{ 
                                                                borderColor: theme.primary,
                                                                color: theme.primary
                                                            }}
                                                        >
                                                            {size}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-2xl font-bold" style={{ color: theme.primary }}>
                                                ₹{product.price.toLocaleString()}
                                            </span>
                                            <div className="flex space-x-1">
                                                <button
                                                    className="px-6 py-2 rounded-lg text-white font-semibold transition-all duration-200 hover:shadow-lg"
                                                    style={{ 
                                                        background: `linear-gradient(to right, ${theme.gradientFrom}, ${theme.gradientTo})`,
                                                    }}
                                                >
                                                    Buy Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <img 
                            src={theme.logo} 
                            alt={`${user.team} logo`} 
                            className="h-32 w-32 mx-auto mb-6 opacity-50"
                        />
                        <h3 className="text-2xl font-semibold mb-4" style={{ color: theme.primary }}>
                            No products available for {user.team}
                        </h3>
                        <p className="text-gray-600 mb-8">
                            Be the first to add products for {user.team} fans!
                        </p>
                        <button
                            onClick={() => navigate('/add-product')}
                            className="px-8 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                            style={{ 
                                background: `linear-gradient(to right, ${theme.gradientFrom}, ${theme.gradientTo})`,
                            }}
                        >
                            Add First Product
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}