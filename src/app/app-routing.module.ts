import { PersonHouseUpdateComponent } from './person-house-update/person-house-update.component';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonUpdateComponent } from './person-update/person-update.component';
import { PersonaCreateComponent } from './persona-create/persona-create.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UsersComponent } from './users/users.component';
import { HouseCreateComponent } from './house-create/house-create.component';
import { PersonHouseCreateComponent } from './person-house-create/person-house-create.component';
import { HouseListComponent } from './house-list/house-list.component';
import { HouseUpdateComponent } from './house-update/house-update.component';

const routes: Routes = [
  {path: 'persons', component: PersonListComponent},
  {path: 'persons/add', component: PersonaCreateComponent},
  {path: 'persons/:id/update', component: PersonUpdateComponent},
  {path: 'persons/:id/nutritional-profile/add', component: UserProfileComponent},
  {path: 'persons/:id/nutritional-profile/update', component: UserProfileUpdateComponent},
  {path: 'persons/:id/user/add', component: UsersComponent},
  {path: 'persons/:id/user/update', component: UserUpdateComponent},
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
