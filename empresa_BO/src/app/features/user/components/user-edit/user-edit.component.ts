import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { UserUpdateModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit{
  userForm: FormGroup;
  userId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: [''],
      lastname: [''],
      email: [''],
      age: ['']
    });
  }
  
  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUser(this.userId).subscribe(user => {
      this.userForm.patchValue(user);
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser: UserUpdateModel = {
        ...this.userForm.value,
        id: this.userId
      };
      this.userService.updateUser(updatedUser).subscribe(() => {
        this.router.navigate(['']);
      }, error => {
        console.error('Error updating user:', error);
      });
    }
  }
}
