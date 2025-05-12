// src/app/models/product.dto.ts
export interface ProductDto {
  id: number;
  title: string;  // product name
  price: number;
  description: string;
  category: string;
  image: string;
}


// Simplified version if you only need specific fields
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}