import { ProductCategory } from './../common/product-category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { environment } from 'src/environments/environment';

export interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
}

export interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(categoryId: number, page: number, size: number): Observable<GetResponseProducts> {
    const url: string = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}&size=${size}&page=${page}`;

    return this.httpClient.get<GetResponseProducts>(url);
  }

  searchProductsPaginate(keyword: string, page: number, size: number): Observable<GetResponseProducts> {
    const url: string = `${this.baseUrl}/products/search/findByNameContaining?name=${keyword}&size=${size}&page=${page}`;

    return this.httpClient.get<GetResponseProducts>(url);
  }

  getProduct(id: number): Observable<Product> {
    const url: string = `${this.baseUrl}/products/${id}`;

    return this.httpClient.get<Product>(url);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const url: string = `${this.baseUrl}/product-category`;

    return this.httpClient
      .get<GetResponseProductCategory>(url)
      .pipe(map(response => response._embedded.productCategory));
  }
}
