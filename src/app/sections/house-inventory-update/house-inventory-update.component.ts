import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, startWith } from 'rxjs';

import { EditResponse } from 'src/app/models/edit-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { FormBuilder } from '@angular/forms';
import { House } from 'src/app/models/house.model';
import { HouseService } from './../../services/house.service';
import { InventoryHousesService } from 'src/app/services/inventory-houses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCatalog } from 'src/app/models/product-catalog.model';
import { ProductCatalogService } from 'src/app/services/product-catalog.service';
import { ProductType } from 'src/app/models/product-type.model';
import { UnitOfMeasurement } from 'src/app/models/unit-of-measurement.model';
import { UnitOfMeasurementService } from './../../services/unit-of-measurement.service';
import { existsForAutocomplete } from 'src/app/functions/existsForAutocomplete';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-house-inventory-update',
  templateUrl: './house-inventory-update.component.html',
  styleUrls: ['./house-inventory-update.component.sass']
})
export class HouseInventoryUpdateComponent implements OnInit{
  inventoryItemForm = this.formBuilder.group({});
  userId = 0;
  houseId = 0;
  inventoryId = 0;
  unitsOfMeasurement: UnitOfMeasurement[] = [];
  productsCatalog: Observable<ProductCatalog[]> | undefined = of([]);
  house: House | undefined = undefined;
  inventoryDetail: any;
  productStatus: any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private unitOfMeasurementService: UnitOfMeasurementService,
    private productCatalogService: ProductCatalogService,
    private inventoryHousesService: InventoryHousesService,
    private houseService: HouseService
  ) {}

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.houseId = this.activatedRoute.snapshot.params['idHouse'];
    this.inventoryId = this.activatedRoute.snapshot.params['idInventory'];

    this.inventoryItemForm.addControl('quantity', this.formBuilder.control(0.0));
    this.inventoryItemForm.addControl('unit_of_measurement', this.formBuilder.control(''));
    this.inventoryItemForm.addControl('product', this.formBuilder.control(''));
    this.inventoryItemForm.addControl('purchase_date', this.formBuilder.control(formatDate(new Date(), "yyyy-MM-dd", "en")));
    this.inventoryItemForm.addControl('expiration_date', this.formBuilder.control(''));

    forkJoin([
      this.inventoryHousesService.get(this.userId, this.houseId, this.inventoryId),
      this.unitOfMeasurementService.list({'filter[category.name]': 'Mass,Volume,Count'}),
      this.productCatalogService.list(),
      this.houseService.get(this.houseId)
    ]).pipe(
      map(([inventoryDetailItem, unitsOfMeasurementList, productCatalogList, houseDetail]) => {
        return {
          inventoryDetail: inventoryDetailItem,
          unitsOfMeasurement: unitsOfMeasurementList,
          productCatalog: productCatalogList,
          house: houseDetail
        }
      }),
      catchError((error: ErrorResponse) => {
        this.snackBar.open(error.error.message, 'Close', { duration: 5000 });
        return of(null);
      })
    ).subscribe((response: any) => {
      this.house = response.house;
      this.productsCatalog = this.inventoryItemForm.get('product')?.valueChanges.pipe(
        startWith(''),
        map((value: string) => response.productCatalog.message.filter((product: ProductCatalog) => existsForAutocomplete(product.type.description, value)
          || existsForAutocomplete(product.presentation?.description, value) || existsForAutocomplete(product.brand?.name, value)))
      );
      this.unitsOfMeasurement = response.unitsOfMeasurement.message;
      this.inventoryItemForm.patchValue({
        quantity: response.inventoryDetail.message.quantity,
        unit_of_measurement: response.unitsOfMeasurement.message.find((unit:any) => unit.id === response.inventoryDetail.message.uom_id),
        product: response.productCatalog.message.find((product: ProductCatalog) => product.id === response.inventoryDetail.message.catalog_id),
        purchase_date: formatDate(response.inventoryDetail.message.purchase_date, "yyyy-MM-dd", "en"),
        expiration_date: formatDate(response.inventoryDetail.message.expiration_date, "yyyy-MM-dd", "en")
      });
      this.inventoryDetail = response.inventoryDetail.message;
    });
  }

  displayProductCatalog(productCatalog: ProductCatalog): string {
    let productName = productCatalog.type ? productCatalog.type.description : '';
    productName += productCatalog.presentation ? ' ' + productCatalog.presentation.description : '';
    productName += productCatalog.brand ? ' ' + productCatalog.brand.name : '';
    return productName;
  }

  saveProductCatalogText(productCatalog: ProductCatalog): string {
    let productCatalogText = '';

    if (Object.keys(productCatalog).length === 0) {
      return productCatalogText;
    }

    if (productCatalog.type.description) {
      productCatalogText += productCatalog.type.description;
      productCatalogText += ' ';
    }

    if (productCatalog.presentation?.description) {
      productCatalogText += productCatalog.presentation.description;
      productCatalogText += ' ';
    }

    productCatalogText = productCatalogText.trim();

    return productCatalogText;
  }

  onSubmit() {
    const quantity = this.inventoryItemForm.get('quantity')?.value;
    const expiration_date = this.inventoryItemForm.get('expiration_date')?.value;
    const product = this.inventoryItemForm.get('product')?.value || {} as ProductCatalog;
    const purchase_date = this.inventoryItemForm.get('purchase_date')?.value;
    const unit_of_measurement = this.inventoryItemForm.get('unit_of_measurement')?.value || {} as UnitOfMeasurement;
    const category = product['category'] || {} as ProductType;
    const brand = product['brand'] || {} as ProductType;

    const params = {
      id: Number(this.inventoryId),
      quantity: quantity,
      expiration_date: expiration_date,
      catalog_id: product.id,
      catalog_description: this.saveProductCatalogText(product),
      category_id: category.id,
      category_name: category.name,
      purchase_date: purchase_date,
      brand_id: brand.id,
      brand_name: brand.name,
      uom_id: unit_of_measurement.id,
      uom_abbreviation: unit_of_measurement.abbreviation,
      house_id: this.houseId,
      house_description: this.house?.description || '',
      product_status: this.inventoryDetail.product_status
    };

    this.inventoryHousesService.update<EditResponse>(this.userId, this.houseId, this.inventoryId, params).subscribe((response: EditResponse) => {
      this.router.navigate(['/users/', this.userId, 'houses', this.houseId, 'inventory']).then(() => {
        this.snackBar.open("Product updated", "Close");
      });
    }, (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });
  }
}
