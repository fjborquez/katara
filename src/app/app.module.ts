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

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserProfileComponent,
    UserListComponent,
    ConfirmUserDeleteComponent,
    UserUpdateComponent,
    UserProfileUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
