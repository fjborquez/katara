import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'users/:id/user-profile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
