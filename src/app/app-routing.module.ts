import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'users/add', component: UsersComponent},
  {path: 'users/:id/user-profile/add', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
