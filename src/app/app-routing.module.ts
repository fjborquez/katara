import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { UserListComponent } from './sections/user-list/user-list.component';
import { UserUpdateComponent } from './sections/user-update/user-update.component';
import { UserCreateComponent } from './sections/user-create/user-create.component';
import { NutritionalProfileViewComponent } from './sections/nutritional-profile-view/nutritional-profile-view.component';
import { UserHouseViewComponent } from './sections/user-house-view/user-house-view.component';
import { UserHouseCreateComponent } from './sections/user-house-create/user-house-create.component';
import { UserHouseUpdateComponent } from './sections/user-house-update/user-house-update.component';
import { HouseResidentsCreateComponent } from './sections/house-residents-create/house-residents-create.component';
import { HouseResidentsViewComponent } from './sections/house-residents-view/house-residents-view.component';
import { HouseResidentsUpdateComponent } from './sections/house-residents-update/house-residents-update.component';
import { HouseInventoryViewComponent } from './sections/house-inventory-view/house-inventory-view.component';

const routes: Routes = [
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
  {path: 'users/:id/houses/:idHouse/inventory', component: HouseInventoryViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
