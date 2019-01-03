import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessageLogin = '';

  forgottenPasswordEmail = '';
  successResetPassword = '';
  errorResetPassword = '';


  constructor(public authService: AuthServiceService, public router: Router) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.email, this.password).then(()=>{
      this.errorMessageLogin = '';
      this.email='';
      this.password='';
      this.router.navigate(['/home']);
    })
    .catch((error)=>{
      this.errorMessageLogin = error.message;
      console.error(this.errorMessageLogin);
    });
  }

  resetPassword(){
    this.authService.resetPassword(this.forgottenPasswordEmail).then(() => {
      console.log('success');
      this.successResetPassword = 'Password reset email successfully sent to ' + this.forgottenPasswordEmail + ' check your inbox (including spam folder).';
      this.errorResetPassword = '';
      this.forgottenPasswordEmail = '';
    })
    .catch((error)=>{
      console.log('failure');
      this.errorResetPassword = error.message;
      this.successResetPassword = '';
      this.forgottenPasswordEmail = '';
    });
  }
}
