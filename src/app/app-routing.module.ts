import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UsersComponent } from './users/users.component';
import { PersonaCreateComponent } from './persona-create/persona-create.component';
import { PersonListComponent } from './person-list/person-list.component';

const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'users/add', component: UsersComponent},
  {path: 'users/:id/update', component: UserUpdateComponent},

  {path: 'persons', component: PersonListComponent},
  {path: 'persons/add', component: PersonaCreateComponent},
  {path: 'persons/:id/nutritional-profile/add', component: UserProfileComponent},
  {path: 'persons/:id/nutritional-profile/update', component: UserProfileUpdateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
