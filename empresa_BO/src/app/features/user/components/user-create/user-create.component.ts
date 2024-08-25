import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserCreateModel } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.userForm   = this.fb.group({
      name: [''],
      lastname: [''],
      email: [''],
      age: ['']
    });  
  }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData: UserCreateModel = this.userForm.value;
      this.userService.createUser(userData).subscribe(
        response => {
          console.log('User succesfully created:', response);
          this.userForm.reset();
          this.router.navigate(['']);
        },
        error => {
          console.error('Error creating user:', error);
        }
      );

    } else {
      console.log('form is invalid');
    }
  }
}
