import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmUserDeleteComponent } from './confirm-user-delete/confirm-user-delete.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UsersComponent } from './users/users.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { PersonaCreateComponent } from './persona-create/persona-create.component';
import { MatSelectModule } from '@angular/material/select';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonUpdateComponent } from './person-update/person-update.component';
import { HouseCreateComponent } from './house-create/house-create.component';
import { PersonHouseCreateComponent } from './person-house-create/person-house-create.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PersonHouseUpdateComponent } from './person-house-update/person-house-update.component';
import { HouseUpdateComponent } from './house-update/house-update.component';
import { HouseListComponent } from './house-list/house-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserProfileComponent,
    UserListComponent,
    ConfirmUserDeleteComponent,
    UserUpdateComponent,
    UserProfileUpdateComponent,
    PersonaCreateComponent,
    PersonListComponent,
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
