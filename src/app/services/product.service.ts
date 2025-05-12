// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductDto, Product } from '../models/product.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  // Get all products with optional sorting and filtering
  getProducts(options?: { 
    sortBy?: 'title' | 'price', 
    sortOrder?: 'asc' | 'desc',
    filterByName?: string 
  }): Observable<Product[]> {
    return this.http.get<ProductDto[]>(this.apiUrl).pipe(
      map(products => {
        // Convert DTO to view model
        let result = products.map(dto => this.mapToProduct(dto));
        
        // filtering
        if (options?.filterByName) {
          result = result.filter(p => 
            p.title.toLowerCase().includes((options.filterByName ?? '').toLowerCase())
          );
        }
        
        // sorting
        if (options?.sortBy) {
          result = this.sortProducts(result, options.sortBy, options.sortOrder);
        }
        
        return result;
      })
    );
  }

  // intermediate mapper
  private mapToProduct(dto: ProductDto): Product {
    return {
      id: dto.id,
      title: dto.title,
      price: dto.price,
      image: dto.image
    };
  }

  // Helper method for sorting
  private sortProducts(
    products: Product[], 
    sortBy: 'title' | 'price', 
    order: 'asc' | 'desc' = 'asc'
  ): Product[] {
    return [...products].sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'price') {
        comparison = a.price - b.price;
      }
      
      return order === 'asc' ? comparison : -comparison;
    });
  }
}