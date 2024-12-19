import { HouseService } from './../../services/house.service';
import { formatDate } from '@angular/common';
import { UnitOfMeasurementService } from './../../services/unit-of-measurement.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, startWith, Observable, of } from 'rxjs';
import { existsForAutocomplete } from 'src/app/functions/existsForAutocomplete';
import { ListResponse } from 'src/app/models/list-response.model';
import { ProductCatalog } from 'src/app/models/product-catalog.model';
import { UnitOfMeasurement } from 'src/app/models/unit-of-measurement.model';
import { ProductCatalogService } from 'src/app/services/product-catalog.service';
import { CreateResponse } from 'src/app/models/create-response.model';
import { InventoryHousesService } from 'src/app/services/inventory-houses.service';
import { House } from 'src/app/models/house.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { Location } from '@angular/common';
import { ProductType } from 'src/app/models/product-type.model';


@Component({
  selector: 'app-house-inventory-create',
  templateUrl: './house-inventory-create.component.html',
  styleUrls: ['./house-inventory-create.component.sass']
})
export class HouseInventoryCreateComponent implements OnInit{
  inventoryItemForm = this.formBuilder.group({});
  userId = 0;
  houseId = 0;
  unitsOfMeasurement: UnitOfMeasurement[] = [];
  productsCatalog: Observable<ProductCatalog[]> | undefined = of([]);
  house: House | undefined = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar,
    private unitOfMeasurementService: UnitOfMeasurementService,
    private productCatalogService: ProductCatalogService,
    private inventoryHousesService: InventoryHousesService,
    private houseService: HouseService
  ) {}

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.houseId = this.activatedRoute.snapshot.params['idHouse'];

    this.inventoryItemForm.addControl('quantity', this.formBuilder.control(0.0));
    this.inventoryItemForm.addControl('unit_of_measurement', this.formBuilder.control(''));
    this.inventoryItemForm.addControl('product', this.formBuilder.control(''));
    this.inventoryItemForm.addControl('purchase_date', this.formBuilder.control(formatDate(new Date(), "yyyy-MM-dd", "en")));
    this.inventoryItemForm.addControl('expiration_date', this.formBuilder.control(''));

    this.unitOfMeasurementService.list({
      'filter[category.name]': 'Mass,Volume,Count'
    }).subscribe((response: ListResponse<UnitOfMeasurement>) => this.unitsOfMeasurement = response.message);
    this.productCatalogService.list().subscribe((response: ListResponse<ProductCatalog>) => {
      this.productsCatalog = this.inventoryItemForm.get('product')?.valueChanges.pipe(
        startWith(''),
        map((value: string) => response.message.filter((product: ProductCatalog) => existsForAutocomplete(product.type.description, value)
          || existsForAutocomplete(product.presentation?.description, value) || existsForAutocomplete(product.brand?.name, value)))
      );
    });

    this.houseService.get(this.houseId).subscribe((response: any) => this.house = response.message);
  }

  displayProductCatalog(productCatalog: ProductCatalog): string {
    let productName = productCatalog.type ? productCatalog.type.description : '';
    productName += productCatalog.presentation ? ' ' + productCatalog.presentation.description : '';
    productName += productCatalog.brand ? ' ' + productCatalog.brand.name : '';
    return productName;
  }

  saveProductCatalogText(productCatalog: ProductCatalog): string {
    let productCatalogText = '';

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
    const type = product['type'] || {} as ProductType;
    const category = product['category'] || {} as ProductType;
    const brand = product['brand'] || {} as ProductType;
    const presentation = product['presentation'] || {} as ProductType;

    const params = {
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
      house_description: this.house?.description || ''
    };

    this.inventoryHousesService.add<CreateResponse>(this.userId, this.houseId, params).subscribe((response: CreateResponse) => {
      this.location.back();
      this.snackBar.open(response.message, "Close");
    }, (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });
  }
}
