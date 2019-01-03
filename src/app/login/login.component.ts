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
  errorMessage = '';

  constructor(public authService: AuthServiceService, public router: Router) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.email, this.password).then(()=>{
      this.errorMessage = '';
      this.router.navigate(['/home']);
    })
    .catch((error)=>{
      this.errorMessage = error.message;
      console.error(this.errorMessage);
    });
  }

}
