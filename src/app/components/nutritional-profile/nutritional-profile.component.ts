import { NutritionalProfileDetail } from './../../models/nutritional-profile-detail.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsumptionLevelService } from './../../services/consumption-level.service';
import { ProductCategoryService } from './../../services/product-category.service';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ConsumptionLevel } from 'src/app/models/consumption-level.model';
import { ErrorResponse } from 'src/app/models/error-response.model';

import { ListResponse } from 'src/app/models/list-response.model';
import { ProductCategory } from 'src/app/models/product-category.model';
import { NutritionalProfileService } from 'src/app/services/nutritional-profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nutritional-profile',
  templateUrl: './nutritional-profile.component.html',
  styleUrls: ['./nutritional-profile.component.sass']
})
export class NutritionalProfileComponent {
  @Input() defaultValues: NutritionalProfileDetail[] | any = [];
  @Input() viewMode = false;
  prevDefaultValues: NutritionalProfileDetail[] = [];
  productCategories: ProductCategory[] = [];
  consumptionLevels: ConsumptionLevel[] = [];
  form: FormGroup = this.formBuilder.group({});
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource();
  userId: number = 0;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private productCategoryService: ProductCategoryService,
    private consumptionLevelService: ConsumptionLevelService,
    private nutritionalProfileService: NutritionalProfileService
  ) { }

  ngOnInit() {
    this.form = this.rootFormGroup.control;
    this.form.addControl('consumptionLevel', new FormControl({}));
    this.form.addControl('productCategory', new FormControl({}))
    this.displayedColumns = ['category', 'consumptionLevel'];
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
      this.defaultValues.forEach((element: any) => {
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

  delete(nutritionalProfileDetail: any) {
    this.nutritionalProfileService.delete(this.userId, nutritionalProfileDetail.category_id).subscribe().add(() => {
      const data = this.dataSource.data;
      const index = data.indexOf(nutritionalProfileDetail);
      data.splice(index, 1);
      this.dataSource.data = data;
      const nutritionalProfile = this.form.get('nutritionalProfile') as FormArray;
      nutritionalProfile.removeAt(index);
      this.defaultValues.splice(index, 1);
    });
  }

}
