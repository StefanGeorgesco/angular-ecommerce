import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, GetResponseProducts } from './../../services/product.service';
import { CartService } from './../../services/cart.service';
import { Product } from './../../common/product';
import { CartItem } from './../../common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  previousKeyword: string = "";
  page: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  updatePageSize(selection: string): void {
    this.pageSize = Number(selection);
    this.page = 1;
    this.listProducts();
  }

  listProducts(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts(): void {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword !== keyword) {
      this.page = 1;
    }

    this.previousKeyword = keyword;

    this.productService
      .searchProductsPaginate(keyword, this.page - 1, this.pageSize)
      .subscribe(this.processResult());
  }

  handleListProducts(): void {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')!;

    if (hasCategoryId) {
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    } else {
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId !== this.currentCategoryId) {
      this.page = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService
      .getProductListPaginate(this.currentCategoryId, this.page - 1, this.pageSize)
      .subscribe(this.processResult());
  }

  private processResult(): (data: GetResponseProducts) => void {
    return (data: GetResponseProducts) => {
      this.products = data._embedded.products;
      this.page = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(new CartItem(product));
  }
}
