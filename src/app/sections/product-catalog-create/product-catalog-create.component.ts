import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';

import { CreateResponse } from './../../models/create-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { ListResponse } from 'src/app/models/list-response.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductBrand } from './../../models/product-brand.model';
import { ProductBrandService } from './../../services/product-brand.service';
import { ProductCatalogService } from './../../services/product-catalog.service';
import { ProductCategory } from './../../models/product-category.model';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductPresentation } from 'src/app/models/product-presentation.model';
import { ProductPresentationService } from './../../services/product-presentation.service';
import { ProductType } from './../../models/product-type.model';
import { ProductTypeService } from './../../services/product-type.service';
import { RouterLink } from '@angular/router';
import { existsForAutocomplete } from 'src/app/functions/existsForAutocomplete';

@Component({
    selector: 'app-product-catalog-create',
    templateUrl: './product-catalog-create.component.html',
    styleUrls: ['./product-catalog-create.component.sass'],
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatAutocompleteModule,
      RouterLink
    ]
})
export class ProductCatalogCreateComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private location = inject(Location);
  private productCategoryService = inject(ProductCategoryService);
  private productBrandService = inject(ProductBrandService);
  private productTypeService = inject(ProductTypeService);
  private productPresentationService = inject(ProductPresentationService);
  private productCatalogService = inject(ProductCatalogService);

  productCatalogForm = this.formBuilder.group({});
  categories: Observable<ProductCategory[]> | undefined = of([]);
  brands: Observable<ProductBrand[]> | undefined= of([]);
  types: Observable<ProductType[]> | undefined = of([]);
  presentations: Observable<ProductPresentation[]> | undefined = of([]);

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

  goBack() {
    this.location.back();
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

