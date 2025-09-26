import { ProductBrandService } from './../../services/product-brand.service';
import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateResponse } from 'src/app/models/create-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';

@Component({
    selector: 'app-product-brand-create',
    templateUrl: './product-brand-create.component.html',
    styleUrls: ['./product-brand-create.component.sass'],
    standalone: false
})
export class ProductBrandCreateComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private location = inject(Location);
  private snackBar = inject(MatSnackBar);
  private productBrandService = inject(ProductBrandService);

  productBrandForm = this.formBuilder.group({});

  ngOnInit() {
    this.productBrandForm.addControl('name', this.formBuilder.control(''));
    this.productBrandForm.addControl('description', this.formBuilder.control(''));
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    const name = this.productBrandForm.get('name')?.value;
    const description = this.productBrandForm.get('description')?.value;

    this.productBrandService.add<CreateResponse>({
      name: name,
      description: description
    }).subscribe((response: CreateResponse) => {
      this.goBack();
      this.snackBar.open(response.message, "Close");
    }, (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });
  }
}
