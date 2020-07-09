import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
// import { AlertifyService } from 'src/app/_services/alertify.service';
import { AlertifyService} from '../../_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
users: User[];
user: User = JSON.parse(localStorage.getItem('user'));
genderList = [{value: 'male', display: 'Males'}, { value: 'female', display: 'Females'}];
userParams: any;
pagination: Pagination;
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'];
    });
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.minAge = 99;
  }
  pageChanged(event: any): void {
    this.pagination.currentpPage = event.page;
    this.loadUsers();
   // console.log(this.pagination.currentpPage);
  }
  resetFilter() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.minAge = 99;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentpPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginationResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.Pagination;
    }, error => {
      this.alertify.error(error);
    });
  }
}
