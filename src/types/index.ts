export interface User {
    id: string;
    name: string;
    email: string;
    team: string;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    team: string;
    sizes: string[];
}