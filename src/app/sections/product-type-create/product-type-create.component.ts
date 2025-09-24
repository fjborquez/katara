import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateResponse } from 'src/app/models/create-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { ProductTypeService } from 'src/app/services/product-type.service';

@Component({
    selector: 'app-product-type-create',
    templateUrl: './product-type-create.component.html',
    styleUrls: ['./product-type-create.component.sass'],
    standalone: false
})
export class ProductTypeCreateComponent implements OnInit {
  productTypeForm = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private snackBar: MatSnackBar,
    private productTypeService: ProductTypeService
  ) {}

  ngOnInit() {
    this.productTypeForm.addControl('description', this.formBuilder.control(''));
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    const description = this.productTypeForm.get('description')?.value;

    this.productTypeService.add<CreateResponse>({
      description: description
    }).subscribe((response: CreateResponse) => {
      this.goBack();
      this.snackBar.open(response.message, "Close");
    }, (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });
  }
}
