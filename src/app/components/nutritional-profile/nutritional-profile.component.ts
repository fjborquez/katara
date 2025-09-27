import { Component, DoCheck, Input, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConsumptionLevel } from 'src/app/models/consumption-level.model';
import { ConsumptionLevelService } from './../../services/consumption-level.service';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { ListResponse } from 'src/app/models/list-response.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NutritionalProfileDetail } from './../../models/nutritional-profile-detail.model';
import { NutritionalProfileService } from 'src/app/services/nutritional-profile.service';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductCategoryService } from './../../services/product-category.service';

@Component({
    selector: 'app-nutritional-profile',
    templateUrl: './nutritional-profile.component.html',
    styleUrls: ['./nutritional-profile.component.sass'],
    standalone: true,
    imports: [
      MatTableModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      MatSelectModule,
      MatButtonModule
    ]
})
export class NutritionalProfileComponent implements OnInit, DoCheck {
  private rootFormGroup = inject(FormGroupDirective);
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private activatedRoute = inject(ActivatedRoute);
  private productCategoryService = inject(ProductCategoryService);
  private consumptionLevelService = inject(ConsumptionLevelService);
  private nutritionalProfileService = inject(NutritionalProfileService);

  @Input() defaultValues: NutritionalProfileDetail[] = [];
  @Input() viewMode = false;
  prevDefaultValues: NutritionalProfileDetail[] = [];
  productCategories: ProductCategory[] = [];
  consumptionLevels: ConsumptionLevel[] = [];
  form: FormGroup = this.formBuilder.group({});
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource();
  userId = 0;

  ngOnInit() {
    this.form = this.rootFormGroup.control;
    this.form.addControl('consumptionLevel', new FormControl({}));
    this.form.addControl('productCategory', new FormControl({}))
    this.displayedColumns = ['index', 'category', 'consumptionLevel'];
    this.userId = Number(this.activatedRoute.snapshot.params['id']);

    if (!this.viewMode) {
      this.displayedColumns.push('options');
    }

    this.prevDefaultValues = this.defaultValues;

    this.productCategoryService.list().subscribe((response: ListResponse<ProductCategory>) => {
      this.productCategories = response.message;
    }, (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });

    this.consumptionLevelService.list().subscribe((response: ListResponse<ConsumptionLevel>) => {
      this.consumptionLevels = response.message;
    }, (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });

    if (this.defaultValues.length > 0) {
      this.defaultValues.forEach((element: NutritionalProfileDetail) => {
        const data = this.dataSource.data;
        data.push({
          category_id: element.product_category_id,
          category: element.product_category_name,
          consumption: element.consumption_level_id
        });
        this.dataSource.data = data;
        const nutritionalProfile = this.form.get('nutritionalProfile') as FormArray;
        nutritionalProfile.push(this.formBuilder.group({
          'product_category_id': new FormControl(element.product_category_id),
          'product_category_name': new FormControl(element.product_category_name),
          'consumption_level_id': new FormControl(element.consumption_level_id),
        }));
      });
    }
  }

  addProductCategoryClick($event:Event): void {
    $event.preventDefault();
    const data = this.dataSource.data;
    const consumptionLevel: ConsumptionLevel = this.form.get('consumptionLevel')?.value;
    const productCategory: ProductCategory = this.form.get('productCategory')?.value;
    data.push({
      category_id: productCategory.id,
      category: productCategory.name,
      consumption: consumptionLevel.name
    });
    const nutritionalProfile = this.form.get('nutritionalProfile') as FormArray;
    nutritionalProfile.push(this.formBuilder.group({
      'product_category_id': new FormControl(productCategory.id),
      'product_category_name': new FormControl(productCategory.name),
      'consumption_level_id': new FormControl(consumptionLevel.id),
    }));

    this.dataSource.data = data;
    this.defaultValues.push({product_category_name: productCategory.name, product_category_id:
      productCategory.id, consumption_level_id: consumptionLevel.id, consumption_level: consumptionLevel});
  }

  ngDoCheck() {
    if (this.prevDefaultValues.length != this.defaultValues.length) {
      const toReplace: any[] = [];
      const nutritionalProfile = this.form.get('nutritionalProfile') as FormArray || new FormArray([]);
      nutritionalProfile.clear();

      this.defaultValues.forEach((element: NutritionalProfileDetail) => {
        nutritionalProfile.push(this.formBuilder.group({
          'product_category_id': new FormControl(element.product_category_id),
          'product_category_name': new FormControl(element.product_category_name),
          'consumption_level_id': new FormControl(element.consumption_level_id),
        }));
        toReplace.push({
          category_id: element.product_category_id,
          category: element.product_category_name,
          consumption: element.consumption_level.name
        });
      });

      this.dataSource.data = toReplace;
    }
  }

  delete(nutritionalProfileDetail: NutritionalProfileDetail) {
    const data = this.dataSource.data;
    const index = data.indexOf(nutritionalProfileDetail);
    data.splice(index, 1);
    this.dataSource.data = data;
    const nutritionalProfile = this.form.get('nutritionalProfile') as FormArray;
    nutritionalProfile.removeAt(index);
    this.defaultValues.splice(index, 1);
  }

}
