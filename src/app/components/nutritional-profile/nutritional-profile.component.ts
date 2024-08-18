import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsumptionLevelService } from './../../services/consumption-level.service';
import { ProductCategoryService } from './../../services/product-category.service';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ConsumptionLevel } from 'src/app/models/consumption-level.model';
import { ErrorResponse } from 'src/app/models/error-response.model';

import { ListResponse } from 'src/app/models/list-response.model';
import { NutritionalRestriction } from 'src/app/models/nutritional-restriction.model';
import { ProductCategory } from 'src/app/models/product-category.model';

@Component({
  selector: 'app-nutritional-profile',
  templateUrl: './nutritional-profile.component.html',
  styleUrls: ['./nutritional-profile.component.sass']
})
export class NutritionalProfileComponent {
  @Input() defaultValues: NutritionalRestriction[] = [];
  productCategories: ProductCategory[] = [];
  consumptionLevels: ConsumptionLevel[] = [];
  form: FormGroup = this.formBuilder.group({});
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource();

  constructor(
    private rootFormGroup: FormGroupDirective,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private productCategoryService: ProductCategoryService,
    private ConsumptionLevelService: ConsumptionLevelService,
  ) { }

  ngOnInit() {
    this.form = this.rootFormGroup.control;
    this.form.addControl('consumptionLevel', new FormControl({}));
    this.form.addControl('productCategory', new FormControl({}))
    this.displayedColumns = ['category', 'consumptionLevel'];

    this.productCategoryService.list().subscribe((response: ListResponse<ProductCategory>) => {
      this.productCategories = response.message;
    }, (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });

    this.ConsumptionLevelService.list().subscribe((response: ListResponse<ConsumptionLevel>) => {
      this.consumptionLevels = response.message;
    }, (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });
  }

  addProductCategoryClick($event:Event): void {
    $event.preventDefault();
    const data = this.dataSource.data;
    const consumptionLevel: ConsumptionLevel = this.form.get('consumptionLevel')?.value;
    const productCategory: ProductCategory = this.form.get('productCategory')?.value;
    data.push({category: productCategory.name, consumption: consumptionLevel.name});
    const nutritionalProfile = this.form.get('nutritionalProfile') as FormArray;
    nutritionalProfile.push(this.formBuilder.group({
      'product_category_id': new FormControl(productCategory.id),
      'product_category_name': new FormControl(productCategory.name),
      'consumption_level_id': new FormControl(consumptionLevel.id),
    }));

    this.dataSource.data = data;
  }

}
