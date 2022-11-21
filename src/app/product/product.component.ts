import { Component, OnInit } from '@angular/core';
import {Product} from "../product";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Product[] | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  add(title: string, price: number): void {
    title = title.trim();
    price = price.valueOf();
    if (!title && !price) { return; }
    this.productService.addProduct({ title, price } as Product)
      .subscribe(product => {
        // @ts-ignore
        this.products.push(product);
      });
  }
}
