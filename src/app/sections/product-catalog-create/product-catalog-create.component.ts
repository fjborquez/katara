import { ProductCategory } from './../../models/product-category.model';
import { CreateResponse } from './../../models/create-response.model';
import { ProductCatalogService } from './../../services/product-catalog.service';
import { ProductPresentationService } from './../../services/product-presentation.service';
import { ProductTypeService } from './../../services/product-type.service';
import { ProductType } from './../../models/product-type.model';
import { ProductBrandService } from './../../services/product-brand.service';
import { ProductBrand } from './../../models/product-brand.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, of, startWith } from 'rxjs';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { ListResponse } from 'src/app/models/list-response.model';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductPresentation } from 'src/app/models/product-presentation.model';
import { Location } from '@angular/common';
import { existsForAutocomplete } from 'src/app/functions/existsForAutocomplete';

@Component({
  selector: 'app-product-catalog-create',
  templateUrl: './product-catalog-create.component.html',
  styleUrls: ['./product-catalog-create.component.sass'],
})
export class ProductCatalogCreateComponent implements OnInit{
  productCatalogForm = this.formBuilder.group({});
  categories: Observable<ProductCategory[]> | undefined = of([]);
  brands: Observable<ProductBrand[]> | undefined= of([]);
  types: Observable<ProductType[]> | undefined = of([]);
  presentations: Observable<ProductPresentation[]> | undefined = of([]);

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private location: Location,
    private productCategoryService: ProductCategoryService,
    private productBrandService: ProductBrandService,
    private productTypeService: ProductTypeService,
    private productPresentationService: ProductPresentationService,
    private productCatalogService: ProductCatalogService
  ) { }

  ngOnInit(): void {
    this.productCatalogForm.addControl('category', this.formBuilder.control(''));
    this.productCatalogForm.addControl('brand', this.formBuilder.control(''));
    this.productCatalogForm.addControl('type', this.formBuilder.control(''));
    this.productCatalogForm.addControl('presentation', this.formBuilder.control(''));

    this.productCategoryService.list().subscribe((response: ListResponse<ProductCategory>) => {
      this.categories = this.productCatalogForm.get('category')?.valueChanges.pipe(
        startWith(''),
        map((value: string) => response.message.filter((category: ProductCategory) => existsForAutocomplete(category.name, value))),
      );
    }, (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });

    this.productBrandService.list().subscribe((response: ListResponse<ProductBrand>) => {
      this.brands = this.productCatalogForm.get('brand')?.valueChanges.pipe(
        startWith(''),
        map((value: string) => response.message.filter((brand: ProductBrand) => existsForAutocomplete(brand.name, value))),
      );
    }, (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });

    this.productTypeService.list().subscribe((response: ListResponse<ProductType>) => {
      this.types = this.productCatalogForm.get('type')?.valueChanges.pipe(
        startWith(''),
        map((value: string) => response.message.filter((type: ProductType) => existsForAutocomplete(type.description, value))),
      );
    }, (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });

    this.productPresentationService.list().subscribe((response: ListResponse<ProductPresentation>) => {
      this.presentations = this.productCatalogForm.get('presentation')?.valueChanges.pipe(
        startWith(''),
        map((value: string) => response.message.filter((presentation: ProductPresentation) => existsForAutocomplete(presentation.description, value))),
      );
    }, (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });
  }

  displayProductCategory(productCategory: ProductCategory): string {
    return productCategory.name;
  }

  displayProductBrand(productBrand: ProductBrand): string {
    return productBrand.name;
  }

  displayProductType(productType: ProductType): string {
    return productType.description;
  }

  displayProductPresentation(productPresentation: ProductPresentation): string {
    return productPresentation.description;
  }

  onSubmit() {
    const productCategory: any = this.productCatalogForm.get('category')?.value;
    const productBrand: any = this.productCatalogForm.get('brand')?.value;
    const productType: any = this.productCatalogForm.get('type')?.value;
    const productPresentation: any = this.productCatalogForm.get('presentation')?.value;

    this.productCatalogService.add<CreateResponse>({
      category_id: productCategory !== undefined ? productCategory.id : null,
      brand_id: productBrand !== undefined ? productBrand.id : null,
      type_id: productType !== undefined ? productType.id : null,
      presentation_id: productPresentation !== undefined ? productPresentation.id : null,
    }).subscribe((response: CreateResponse) => {
      this.location.back();
      this.snackBar.open(response.message, "Close");
    }, (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });
  }
}

