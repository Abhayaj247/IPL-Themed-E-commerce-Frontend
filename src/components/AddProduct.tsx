// src/components/AddProduct.tsx
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IPL_TEAMS, PRODUCT_CATEGORIES, API_BASE_URL } from '../config/constants';

export function AddProduct() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const imageUrlRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const teamRef = useRef<HTMLSelectElement>(null);
    const sizesRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const sizesString = sizesRef.current?.value || '';
            const sizes = sizesString ? sizesString.split(',').map(size => size.trim()) : [];

            const productData = {
                name: nameRef.current?.value,
                description: descriptionRef.current?.value,
                price: Number(priceRef.current?.value),
                imageUrl: imageUrlRef.current?.value,
                category: categoryRef.current?.value,
                team: teamRef.current?.value,
                sizes: sizes.length > 0 ? sizes : undefined
            };

            await axios.post(
                `${API_BASE_URL}/products`,
                productData,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            navigate('/dashboard');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600">
                        <h2 className="text-3xl font-bold text-white">Add New Product</h2>
                        <p className="text-blue-100 mt-2">Create a new product listing</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Product Name</label>
                            <input
                                type="text"
                                ref={nameRef}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Description</label>
                            <textarea
                                ref={descriptionRef}
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-2">Price (₹)</label>
                                <input
                                    type="number"
                                    ref={priceRef}
                                    min="0"
                                    step="0.01"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-2">Image URL</label>
                                <input
                                    type="url"
                                    ref={imageUrlRef}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-2">Category</label>
                                <select
                                    ref={categoryRef}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {PRODUCT_CATEGORIES.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-2">Team</label>
                                <select
                                    ref={teamRef}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select Team</option>
                                    {IPL_TEAMS.map(team => (
                                        <option key={team} value={team}>{team}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                Sizes (comma-separated, e.g., "S,M,L,XL")
                            </label>
                            <input
                                type="text"
                                ref={sizesRef}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Optional: S,M,L,XL"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="px-6 py-3 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {loading ? 'Adding Product...' : 'Add Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}