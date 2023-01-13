import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Product } from './../../common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    const searchMode: boolean = this.route.snapshot.paramMap.has('keyword');

    if (searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;
    
    this.productService
      .searchProducts(keyword)
      .subscribe((data) => {
        this.products = data;
      });
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')!;
    let currentCategoryId: number = 1;
    
    if (hasCategoryId) {
      currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    } else {
      currentCategoryId = 1;
    }

    this.productService
      .getProductList(currentCategoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
