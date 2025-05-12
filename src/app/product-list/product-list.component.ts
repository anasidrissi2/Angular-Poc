import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ProductDto } from '../models/product.dto';
import { ProductService } from '../services/product.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatInputModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductDto[] = [];
  filteredProducts: ProductDto[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  searchInput = '';
  sortBy: 'title' | 'price' = 'title';
  sortOrder: 'asc' | 'desc' = 'asc';
  hoveredCardId: number | null = null;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.setupSearchDebounce();
    this.loadProducts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearchDebounce() {
    this.searchSubject.pipe(
      debounceTime(500), // Wait 500ms after last input
      distinctUntilChanged(), // Only emit if value changed
      takeUntil(this.destroy$) // Clean up on component destroy
    ).subscribe(searchTerm => {
      this.searchInput = searchTerm;
      this.applyFilters();
    });
  }

  onSearchInputChange(searchValue: string): void {
    this.searchSubject.next(searchValue.trim());
  }

  loadProducts() {
    this.isLoading = true;
    this.error = null;

    this.productService.getProducts({
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      filterByName: this.searchInput
    }).subscribe({
      next: (products: any) => {
        this.products = products;
        this.filteredProducts = products;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'Failed to load products';
        this.isLoading = false;
      }
    });
  }

  applyFilters() {
    this.loadProducts();
  }


}