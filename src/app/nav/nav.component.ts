import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { tokenGetter } from '../app.module';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  // tslint:disable-next-line: variable-name
  constructor(public _authservice: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this._authservice.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }
  login() {
    // tslint:disable-next-line: no-debugger
    this._authservice.login(this.model).subscribe(next => {
      this.alertify.success('logged In Successfull');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }
  loggedIn() {
    return this._authservice.loggedIn();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._authservice.decodedToken = null;
    this._authservice.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
    window.location.reload();
  }

}
