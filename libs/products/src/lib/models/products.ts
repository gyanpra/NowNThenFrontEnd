import { Category } from "@nownthenfrontend/products";

export class Product{
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    images?: string[];
    createdAt?: string;
    isFeatured?: string;
    totalReviews?: number;
    rating?: number;
    stock?: number;
    category?: Category;
    price?: number;
    brand?: string;
}
