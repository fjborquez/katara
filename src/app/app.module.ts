import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmUserDeleteComponent } from './components/confirm-user-delete/confirm-user-delete.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NutritionalProfileViewComponent } from './sections/nutritional-profile-view/nutritional-profile-view.component';
import { UserProfileUpdateComponent } from './sections/user-profile-update/user-profile-update.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { UserCreateComponent } from './sections/user-create/user-create.component';
import { MatSelectModule } from '@angular/material/select';
import { UserListComponent } from './sections/user-list/user-list.component';
import { UserUpdateComponent } from './sections/user-update/user-update.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserHouseViewComponent } from './sections/user-house-view/user-house-view.component';
import { MatIconModule } from '@angular/material/icon';
import { UserHouseCreateComponent } from './sections/user-house-create/user-house-create.component';
import { UserHouseUpdateComponent } from './sections/user-house-update/user-house-update.component';
import { HouseResidentsCreateComponent } from './sections/house-residents-create/house-residents-create.component';
import { HouseResidentsViewComponent } from './sections/house-residents-view/house-residents-view.component';
import { HouseResidentsUpdateComponent } from './sections/house-residents-update/house-residents-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NutritionalProfileViewComponent,
    ConfirmUserDeleteComponent,
    UserProfileUpdateComponent,
    UserCreateComponent,
    UserListComponent,
    UserUpdateComponent,
    UserHouseViewComponent,
    UserHouseCreateComponent,
    UserHouseUpdateComponent,
    HouseResidentsCreateComponent,
    HouseResidentsViewComponent,
    HouseResidentsUpdateComponent,
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
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
