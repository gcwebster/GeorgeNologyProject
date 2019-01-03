import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email = '';
  name = '';
  password = '';
  errorMessage = '';

  constructor(public authService: AuthServiceService, public router: Router) { }

  ngOnInit() {
  }

  createUser(){
    /**
     * IMPORTANT!
     * Using 'function' we cannot access this.email/password/errorMessage, using () => we can.
     */
    this.authService.registerUser(this.email, this.password).then(()=>{
      this.authService.setUserDisplayName(this.name);
      this.name = '';
      this.errorMessage = '';
      this.email = '';
      this.password = '';
      this.router.navigate(['/home']);
    })
    .catch((error)=>{
      this.errorMessage = error.message;
      console.error(this.errorMessage);
    });
  }
}
