import { PersonHouseUpdateComponent } from './sections/person-house-update/person-house-update.component';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { UserListComponent } from './sections/user-list/user-list.component';
import { UserUpdateComponent } from './sections/user-update/user-update.component';
import { UserCreateComponent } from './sections/user-create/user-create.component';
import { NutritionalProfileViewComponent } from './sections/nutritional-profile-view/nutritional-profile-view.component';
import { UserProfileUpdateComponent } from './sections/user-profile-update/user-profile-update.component';
import { HouseCreateComponent } from './sections/house-create/house-create.component';
import { PersonHouseCreateComponent } from './sections/person-house-create/person-house-create.component';
import { HouseListComponent } from './sections/house-list/house-list.component';
import { HouseUpdateComponent } from './sections/house-update/house-update.component';

const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'users/add', component: UserCreateComponent},
  {path: 'users/:id/update', component: UserUpdateComponent},
  {path: 'users/:id/nutritional-profile', component: NutritionalProfileViewComponent},
  {path: 'persons/:id/nutritional-profile/update', component: UserProfileUpdateComponent},
  {path: 'persons/:id/houses/add', component: PersonHouseCreateComponent},
  {path: 'persons/:id/houses/update', component: PersonHouseUpdateComponent},
  {path: 'houses', component: HouseListComponent},
  {path: 'houses/add', component: HouseCreateComponent},
  {path: 'houses/:id/update', component: HouseUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
