import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user;
  newItem = '';
  nameFrom = '';
  nameTo = '';
  picture = '';
  rating: number;
  errorMessage = '';

  items: Observable<any[]>;
  constructor(public db: AngularFirestore, public afAuth: AuthServiceService, public router: Router, public dbService: DatabaseService) {
    this.items = db.collection('items').valueChanges();
    this.user = this.afAuth.user;

  }

  ngOnInit() {
    this.user = this.afAuth.user;
  }

  logout(){
    this.afAuth.logout().then(()=>{
      this.router.navigate(['/login']);
    });
  }

  createItem(){
    //If statement stops empty submission, try/catch bought in to allow for empty field error that isn't caught from firebase promise.
    if(this.newItem != ''){
      try{
        this.dbService.createItem(this.newItem, this.nameFrom, this.nameTo, this.picture, this.rating).then(()=>{
          this.newItem = '';
          this.nameFrom = '';
          this.nameTo = '';
          this.picture = '';
          this.rating= 0;
          this.errorMessage = '';
        })
        .catch((error)=>{
          this.errorMessage = error.message;
          console.error(this.errorMessage);
        });
      }
      catch (error){
        if(error.message == "Function DocumentReference.set() called with invalid data. Unsupported field value: undefined (found in field rating)")
          this.errorMessage = "You didn't fill out all the fields, double check they're all complete!"
        else
          this.errorMessage = error.message;
      }
    }
  }
}


  
