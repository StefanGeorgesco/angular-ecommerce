import { ProductCategory } from './../common/product-category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {}

  getProductList(categoryId: number): Observable<Product[]> {
    const url: string = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}`;

    return this.getProducts(url);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const url: string = `${this.baseUrl}/products/search/findByNameContaining?name=${keyword}`;

    return this.getProducts(url);
  }

  private getProducts(url: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(url)
      .pipe(map((response) => response._embedded.products));
  }

  getProduct(id: number): Observable<Product> {
    const url: string = `${this.baseUrl}/products/${id}`;

    return this.httpClient.get<Product>(url);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const url: string = `${this.baseUrl}/product-category`;

    return this.httpClient
      .get<GetResponseProductCategory>(url)
      .pipe(map((response) => response._embedded.productCategory));
  }
}
