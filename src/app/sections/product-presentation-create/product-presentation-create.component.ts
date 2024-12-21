import { CreateResponse } from 'src/app/models/create-response.model';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductPresentationService } from 'src/app/services/product-presentation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorResponse } from 'src/app/models/error-response.model';

@Component({
  selector: 'app-product-presentation-create',
  templateUrl: './product-presentation-create.component.html',
  styleUrls: ['./product-presentation-create.component.sass']
})
export class ProductPresentationCreateComponent implements OnInit {
  productPresentationForm = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private snackBar: MatSnackBar,
    private productPresentationService: ProductPresentationService
  ) {}

  ngOnInit() {
    this.productPresentationForm.addControl('description', this.formBuilder.control(''));
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    const description = this.productPresentationForm.get('description')?.value;

    this.productPresentationService.add<CreateResponse>({
      description: description
    }).subscribe((response: CreateResponse) => {
      this.goBack();
      this.snackBar.open(response.message, "Close");
    }, (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });
  }
}
