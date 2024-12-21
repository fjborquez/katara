import { CustomErrorHandler } from './custom-error-handler';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HouseResidentsCreateComponent } from './sections/house-residents-create/house-residents-create.component';
import { HouseResidentsUpdateComponent } from './sections/house-residents-update/house-residents-update.component';
import { HouseResidentsViewComponent } from './sections/house-residents-view/house-residents-view.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ErrorHandler, NgModule } from '@angular/core';
import { NutritionalProfileComponent } from './components/nutritional-profile/nutritional-profile.component';
import { NutritionalProfileViewComponent } from './sections/nutritional-profile-view/nutritional-profile-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './sections/user-create/user-create.component';
import { UserHouseCreateComponent } from './sections/user-house-create/user-house-create.component';
import { UserHouseUpdateComponent } from './sections/user-house-update/user-house-update.component';
import { UserHouseViewComponent } from './sections/user-house-view/user-house-view.component';
import { UserListComponent } from './sections/user-list/user-list.component';
import { UserUpdateComponent } from './sections/user-update/user-update.component';
import { HouseInventoryViewComponent } from './sections/house-inventory-view/house-inventory-view.component';
import { ProductCatalogCreateComponent } from './sections/product-catalog-create/product-catalog-create.component';
import { MatInputModule } from '@angular/material/input';
import { HouseInventoryCreateComponent } from './sections/house-inventory-create/house-inventory-create.component';
import { ProductCategoryCreateComponent } from './sections/product-category-create/product-category-create.component';
import { ProductBrandCreateComponent } from './sections/product-brand-create/product-brand-create.component';
import { ProductTypeCreateComponent } from './sections/product-type-create/product-type-create.component';
import { ProductPresentationCreateComponent } from './sections/product-presentation-create/product-presentation-create.component';

@NgModule({
  declarations: [
    AppComponent,
    NutritionalProfileViewComponent,
    AlertDialogComponent,
    UserCreateComponent,
    UserListComponent,
    UserUpdateComponent,
    UserHouseViewComponent,
    UserHouseCreateComponent,
    UserHouseUpdateComponent,
    HouseResidentsCreateComponent,
    HouseResidentsViewComponent,
    HouseResidentsUpdateComponent,
    NutritionalProfileComponent,
    HouseInventoryViewComponent,
    ProductCatalogCreateComponent,
    HouseInventoryCreateComponent,
    ProductCategoryCreateComponent,
    ProductBrandCreateComponent,
    ProductTypeCreateComponent,
    ProductPresentationCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: CustomErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
