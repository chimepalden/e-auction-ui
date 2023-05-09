import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, Observable, Subject, BehaviorSubject } from 'rxjs';
import { BidModel } from '../models/bidModel';
import { ProductModel } from '../models/productModel';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private visitedAsSeller = new BehaviorSubject<boolean>(false);
  private productList = new BehaviorSubject<ProductModel[]>([]);

  constructor(private http: HttpClient) {}

  getVisitedStatus() {
    return this.visitedAsSeller.value;
  }

  getProductList() {
    return this.productList.asObservable();
  }

  getSellerProducts(id: string) {
    this.http
      .get<ProductModel[]>(`http://localhost:3002/seller/${id}`)
      .subscribe((res) => {
        this.productList.next(res as ProductModel[]);
        this.visitedAsSeller.next(true);
      });
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
}
