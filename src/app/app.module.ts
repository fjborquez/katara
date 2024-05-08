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
import { PersonUpdateComponent } from './sections/person-update/person-update.component';
import { HouseCreateComponent } from './sections/house-create/house-create.component';
import { PersonHouseCreateComponent } from './sections/person-house-create/person-house-create.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PersonHouseUpdateComponent } from './sections/person-house-update/person-house-update.component';
import { HouseUpdateComponent } from './sections/house-update/house-update.component';
import { HouseListComponent } from './sections/house-list/house-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NutritionalProfileViewComponent,
    ConfirmUserDeleteComponent,
    UserProfileUpdateComponent,
    UserCreateComponent,
    UserListComponent,
    PersonUpdateComponent,
    HouseCreateComponent,
    PersonHouseCreateComponent,
    PersonHouseUpdateComponent,
    HouseUpdateComponent,
    HouseListComponent
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
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
