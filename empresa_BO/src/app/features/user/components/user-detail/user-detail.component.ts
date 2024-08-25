import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../../core/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  user: UserModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  
  ngOnInit(): void {
    let str  = this.route.snapshot.paramMap.get('id')!;
    const id = parseInt(str);
    console.log(id);
    
    this.userService.getUser(id).subscribe(
      user => {
        this.user = user;
      }
    )
  }

  goBack(): void {
    window.history.back();
  }
}
