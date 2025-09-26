import { RouterModule, Routes } from '@angular/router';

import { HouseInventoryCreateComponent } from './sections/house-inventory-create/house-inventory-create.component';
import { HouseInventoryUpdateComponent } from './sections/house-inventory-update/house-inventory-update.component';
import { HouseInventoryViewComponent } from './sections/house-inventory-view/house-inventory-view.component';
import { HouseResidentsCreateComponent } from './sections/house-residents-create/house-residents-create.component';
import { HouseResidentsUpdateComponent } from './sections/house-residents-update/house-residents-update.component';
import { HouseResidentsViewComponent } from './sections/house-residents-view/house-residents-view.component';
import { NgModule } from '@angular/core';
import { NutritionalProfileViewComponent } from './sections/nutritional-profile-view/nutritional-profile-view.component';
import { ProductBrandCreateComponent } from './sections/product-brand-create/product-brand-create.component';
import { ProductCatalogCreateComponent } from './sections/product-catalog-create/product-catalog-create.component';
import { ProductCategoryCreateComponent } from './sections/product-category-create/product-category-create.component';
import { ProductPresentationCreateComponent } from './sections/product-presentation-create/product-presentation-create.component';
import { ProductTypeCreateComponent } from './sections/product-type-create/product-type-create.component';
import { UserCreateComponent } from './sections/user-create/user-create.component';
import { UserHouseCreateComponent } from './sections/user-house-create/user-house-create.component';
import { UserHouseUpdateComponent } from './sections/user-house-update/user-house-update.component';
import { UserHouseViewComponent } from './sections/user-house-view/user-house-view.component';
import { UserListComponent } from './sections/user-list/user-list.component';
import { UserUpdateComponent } from './sections/user-update/user-update.component';

export const ROUTES: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'users/add', component: UserCreateComponent},
  {path: 'users/:id/update', component: UserUpdateComponent},
  {path: 'users/:id/nutritional-profile', component: NutritionalProfileViewComponent},
  {path: 'users/:id/houses', component: UserHouseViewComponent},
  {path: 'users/:id/houses/add', component: UserHouseCreateComponent},
  {path: 'users/:id/houses/:idHouse/update', component: UserHouseUpdateComponent},
  {path: 'users/:id/houses/:idHouse/residents', component: HouseResidentsViewComponent},
  {path: 'users/:id/houses/:idHouse/residents/add', component: HouseResidentsCreateComponent},
  {path: 'users/:id/houses/:idHouse/residents/:idResident/update', component: HouseResidentsUpdateComponent},
  {path: 'users/:id/houses/:idHouse/inventory', component: HouseInventoryViewComponent},
  {path: 'users/:id/houses/:idHouse/inventory/add', component: HouseInventoryCreateComponent},
  {path: 'users/:id/houses/:idHouse/inventory/:idInventory/update', component: HouseInventoryUpdateComponent},
  {path: 'product-catalog/add', component: ProductCatalogCreateComponent},
  {path: 'product-category/add', component: ProductCategoryCreateComponent},
  {path: 'product-brand/add', component: ProductBrandCreateComponent},
  {path: 'product-type/add', component: ProductTypeCreateComponent},
  {path: 'product-presentation/add', component: ProductPresentationCreateComponent}
];
