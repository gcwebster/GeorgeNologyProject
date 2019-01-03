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
  
  newImage = '';
  errorUpdateImage = '';

  presents: Observable<any[]>;
  constructor(public db: AngularFirestore, public afAuth: AuthServiceService, public router: Router, public dbService: DatabaseService) {
    this.presents = dbService.presents;
    this.user = this.afAuth.user;
  }

  ngOnInit() {
    this.user = this.afAuth.user;
    this.dbService.user = this.user;
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
        this.dbService.createItem(this.newItem, this.nameFrom, this.nameTo, this.picture, this.rating, this.user.uid).then(()=>{
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

  updateProfilePicture(){
    this.afAuth.setUserPhotoURL(this.user.displayName, this.newImage).then(()=>{
      this.newImage = '';
    })
    .catch((error)=> {
      this.errorUpdateImage = error.message;
    })

  }

  delete(id){
    this.dbService.deleteItem(id).catch((error) =>{
      console.error(error.message);
    });
  }

  updateLetter(present){
    this.dbService.updateLetterSent(present).catch((error) =>{
      console.error(error.message);
    });;
  }

  generateThankYouCards(){
    this.router.navigate(['/letters']);
  }
}


  
