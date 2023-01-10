import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {}

  getProductList(categoryId: number): Observable<Product[]> {

    const url: string = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient
      .get<GetResponse>(url)
      .pipe(map((response) => response._embedded.products));
  }
}
