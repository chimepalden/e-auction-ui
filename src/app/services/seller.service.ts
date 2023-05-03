import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, Observable } from 'rxjs';
import { BidModel } from '../models/bidModel';
import { ProductModel } from '../models/productModel';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient) {}

  getSellerProducts(id: string) {
    return this.http.get(`http://localhost:3002/seller/${id}`);
  }

  // getAllUsers() {
  //   return this.http.get('http://localhost:3002/users');
  // }

  getProductBidsDetailList(bids: string[]): Observable<BidModel[]> {
    let myHeaders = new HttpHeaders({ myHeader: bids });
    return this.http.get<BidModel[]>('http://localhost:3002/seller', {
      headers: myHeaders,
    });
  }

  addProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(
      'http://localhost:3002/seller',
      product
    );
  }

  editProduct(product: ProductModel): Observable<ProductModel> {
    console.log(product);
    return this.http.patch<ProductModel>(
      'http://localhost:3002/seller',
      product
    );
  }

  deleteProduct(product: ProductModel): Observable<ProductModel> {
    console.log(product);
    return this.http.delete<ProductModel>(
      `http://localhost:3002/seller/${product.productId}`
    );
  }
}
