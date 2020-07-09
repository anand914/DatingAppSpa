import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private authService: AuthService, private alertify: AlertifyService,
              private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { ' mismatch': true };
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successfull');
      }, error => {
        this.alertify.error(error);
      }, () => {
         this.authService.login(this.user).subscribe( () => {
           this.router.navigate(['/members']);
         });
      });
    }
    // tslint:disable-next-line: no-debugger
    // debugger;
    // this.authService.register(this.model).subscribe(() => {
    //   // tslint:disable-next-line: no-debugger
    //   this.alertify.success('registration successful');
    //   this.router.navigate(['/home']);
    // }, error => {
    //   this.alertify.error(error);
    // });
  }
  cancel() {
    this.cancelRegister.emit(false);
    console.log('canceled');
  }
}
