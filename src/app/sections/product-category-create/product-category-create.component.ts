import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { CreateResponse } from 'src/app/models/create-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
    selector: 'app-product-category-create',
    templateUrl: './product-category-create.component.html',
    styleUrls: ['./product-category-create.component.sass'],
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatButtonModule
    ]
})
export class ProductCategoryCreateComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private location = inject(Location);
  private snackBar = inject(MatSnackBar);
  private productCategoryService = inject(ProductCategoryService);

  productCategoryForm = this.formBuilder.group({});

  ngOnInit() {
    this.productCategoryForm.addControl('name', this.formBuilder.control(''));
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    const name = this.productCategoryForm.get('name')?.value;

    this.productCategoryService.add<CreateResponse>({
      name: name
    }).subscribe((response: CreateResponse) => {
      this.goBack();
      this.snackBar.open(response.message, "Close");
    }, (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });
  }

}
