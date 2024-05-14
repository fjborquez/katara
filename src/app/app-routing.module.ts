import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { UserListComponent } from './sections/user-list/user-list.component';
import { UserUpdateComponent } from './sections/user-update/user-update.component';
import { UserCreateComponent } from './sections/user-create/user-create.component';
import { NutritionalProfileViewComponent } from './sections/nutritional-profile-view/nutritional-profile-view.component';
import { UserProfileUpdateComponent } from './sections/user-profile-update/user-profile-update.component';
import { UserHouseViewComponent } from './sections/user-house-view/user-house-view.component';
import { UserHouseCreateComponent } from './sections/user-house-create/user-house-create.component';

const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'users/add', component: UserCreateComponent},
  {path: 'users/:id/update', component: UserUpdateComponent},
  {path: 'users/:id/nutritional-profile', component: NutritionalProfileViewComponent},
  {path: 'users/:id/houses', component: UserHouseViewComponent},
  {path: 'users/:id/houses/add', component: UserHouseCreateComponent},
  {path: 'persons/:id/nutritional-profile/update', component: UserProfileUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
