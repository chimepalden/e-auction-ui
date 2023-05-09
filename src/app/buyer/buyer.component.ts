import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BidModel } from '../models/bidModel';
import { ProductModel } from '../models/productModel';
import { UserModel } from '../models/userModel';
import { AuthService } from '../services/auth.service';
import { BuyerService } from '../services/buyer.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css'],
})
export class BuyerComponent implements OnInit {
  // private isUserAuthenticated = new BehaviorSubject<boolean>(false);
  userId!: string;
  buyerProductList: ProductModel[] = [];
  buyerBidList: BidModel[] = [];
  productBid!: BidModel;
  currentProduct: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private buyerService: BuyerService
  ) {}

  ngOnInit(): void {
    if (this.authService.getIsAuth()) {
      console.log(this.buyerService.getVisitedStatus());
      if (!this.buyerService.getVisitedStatus()) {
        this.userId = this.authService.getUserId();
        this.buyerService
          .getBuyerDetail(this.userId)
          .subscribe((res) => (this.buyerProductList = res));
      } else if (this.buyerService.getVisitedStatus()) {
        this.buyerProductList = this.buyerService.getProductList();
      }
    } else {
      window.alert('Please login to continue');
      this.router.navigate(['/login']);
    }
  }

  showProductDetail(product: ProductModel) {
    this.buyerBidList = this.buyerService.getBidList();
    for (let bid of this.buyerBidList) {
      if (
        bid.productId === product.productId &&
        bid.bidder.userId === this.userId
      ) {
        this.productBid = bid;
        break;
      }
    }
    this.currentProduct = product;
  }

  toBuyerHomePage() {
    if (this.currentProduct) {
      this.currentProduct = undefined;
    }
  }
}
