import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from '../models/productModel';
import { BidModel } from '../models/bidModel';

@Injectable({
  providedIn: 'root',
})
export class BuyerService {
  private visitedAsBuyer = new BehaviorSubject<boolean>(false);
  private productList = new BehaviorSubject<ProductModel[]>([]);
  private bidList = new BehaviorSubject<BidModel[]>([]);

  constructor(private http: HttpClient) {}

  getVisitedStatus() {
    return this.visitedAsBuyer.value;
  }

  getProductList() {
    return this.productList.value;
  }

  getBidList() {
    return this.bidList.value;
  }

  getBuyerDetail(id: string) {
    this.http.get(`http://localhost:3002/buyer/${id}`).subscribe((res) => {
      this.productList.next((res as any).productList);
      this.bidList.next((res as any).bidList);
      this.visitedAsBuyer.next(true);
    });
    return this.productList;
  }
}
