import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { CreateResponse } from 'src/app/models/create-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductPresentationService } from 'src/app/services/product-presentation.service';

@Component({
    selector: 'app-product-presentation-create',
    templateUrl: './product-presentation-create.component.html',
    styleUrls: ['./product-presentation-create.component.sass'],
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatButtonModule
    ]
})
export class ProductPresentationCreateComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private location = inject(Location);
  private snackBar = inject(MatSnackBar);
  private productPresentationService = inject(ProductPresentationService);

  productPresentationForm = this.formBuilder.group({});

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
