import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';

  constructor(public authService: AuthServiceService) { }

  ngOnInit() {
  }

  createUser(){
    /**
     * IMPORTANT!
     * Using 'function' we cannot access this.email/password/errorMessage, using () => we can.
     */
    this.authService.registerUser(this.email, this.password).then(()=>{
      this.errorMessage = '';
    })
    .catch((error)=>{
      this.errorMessage = error.message;
      console.error(this.errorMessage);
    });
  }
}
