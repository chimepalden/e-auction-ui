import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductModel } from '../models/productModel';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  modalTitle: string = '';
  productInfo: ProductModel = {
    productId: '',
    name: '',
    description: '',
    detailDescription: '',
    category: '',
    startingPrice: 0,
    bidEndDate: new Date(),
    sellerId: '',
  };
  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modalTitle = data.title;
    if (data.productInfo) {
      this.productInfo = data.productInfo;
    }
  }

  ngOnInit(): void {}

  save() {
    this.dialogRef.close(this.productInfo);
  }

  close() {
    this.dialogRef.close();
  }
}
