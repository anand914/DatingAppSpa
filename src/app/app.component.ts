import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwthelper = new JwtHelperService();
  title = 'Dating-App';
  constructor(private authService: AuthService) {}
  ngOnInit() {
   const token = localStorage.getItem('token');
  //  const user: User = JSON.parse(localStorage.getItem('user'));
   const user: User = JSON.parse(JSON.stringify(localStorage.getItem('user')));
   if (token) {
     this.authService.decodedToken = this.jwthelper.decodeToken(token);
   }
   if (user) {
   this.authService.currentUser = user;
   }
  }
}
