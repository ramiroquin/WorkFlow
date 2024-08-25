import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: UserModel[] = [];
  displayedColumns: string[] = ['id', 'name', 'lastname', 'email', 'actions'];

  constructor(private userService: UserService, private router: Router) { }
  
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: UserModel[]) => this.users = data
    );
  }
  
  viewDetails(userId: number): void {
    console.log(userId)
    this.router.navigate(['/detail', userId]);
  }

  viewEdit(userId: number): void {
    this.router.navigate(['/edit', userId]);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: response => {
        console.log('deleted succcesfully');
        this.loadUsers();
      },
      error: e => {
        console.error(`error: ${e.message}`);
      }
    });
  }
}
