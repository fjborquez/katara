import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent {
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['id', 'name', 'lastname', 'email', 'profile', 'options'];

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.list().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }
}
