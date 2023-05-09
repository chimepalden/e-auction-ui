import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { BidModel } from '../models/bidModel';
import { ProductModel } from '../models/productModel';
import { AuthService } from '../services/auth.service';
import { SellerService } from '../services/seller.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellerComponent implements OnInit {
  userId: string = '';
  sellerProductList: ProductModel[] = [];
  productBidsDetailList: BidModel[] = [];
  currentProduct: any;
  dialogProductInfo: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sellerService: SellerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.authService.getIsAuth()) {
      console.log(this.sellerService.getVisitedStatus());
      this.userId = this.authService.getUserId();
      if (!this.sellerService.getVisitedStatus()) {
        this.sellerService.getSellerProducts(this.userId);
      }
      this.sellerService
        .getProductList()
        .subscribe((res) => (this.sellerProductList = res));
    } else {
      window.alert('Please login to continue');
      this.router.navigate(['/login']);
    }
  }

  openDialog(event: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '150px',
    };

    const id = event.currentTarget.id;
    if (id && id === 'add') {
      dialogConfig.data = {
        title: 'Add Product',
      };
    } else if (id && id === 'edit') {
      dialogConfig.data = {
        title: 'Edit Product',
        productInfo: this.currentProduct,
      };
    }

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((modalData) => {
      if (modalData && modalData !== undefined) {
        modalData.sellerId = this.userId;
        this.dialogProductInfo = modalData;

        if (id && id === 'add') {
          this.sellerService
            .addProduct(this.dialogProductInfo)
            .subscribe((res) => {
              this.sellerProductList.push(res as any);
            });
        } else if (id && id === 'edit') {
          // converting type(number) to match backend type(number string)
          this.dialogProductInfo.startingPrice =
            this.dialogProductInfo.startingPrice.toString();
          this.sellerService
            .editProduct(this.dialogProductInfo)
            .subscribe((res) => console.log(res));
        }
      } else console.log('action cancelled');
    });
  }

  showProductDetail(product: ProductModel) {
    this.productBidsDetailList = [];
    if (product.bids && product.bids.length !== 0) {
      this.sellerService
        .getProductBidsDetailList(product.bids)
        .subscribe((res) => (this.productBidsDetailList = res as any));
    }
    this.currentProduct = product;
  }

  toSellerHomePage() {
    if (this.currentProduct) {
      this.currentProduct = undefined;
    }
  }

  deleteProduct() {
    const response = confirm('Are you sure?');
    if (response) {
      this.sellerService.deleteProduct(this.currentProduct).subscribe((res) => {
        const index = this.sellerProductList.indexOf(this.currentProduct);
        if (index > -1) {
          this.sellerProductList.splice(index, 1);
          this.showProductDetail(this.sellerProductList[0]);
        } else {
          alert('Something went wrong. Refresh your page.');
        }
      });
    }
  }
}
