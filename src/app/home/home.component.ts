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
  avatarClicked = false;

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

  accessProfilePictureChange(){
    this.avatarClicked = !this.avatarClicked;
    this.newImage = '';
  }
  logout(){
    this.afAuth.logout().then(()=>{
      this.router.navigate(['/login']);
    });
  }

  createItem(){
    //If statement stops empty submission, try/catch bought in to allow for empty field error that isn't caught from firebase promise.
    if(this.newItem != '' && this.nameFrom != '' && this.nameTo != '' && this.picture != ''){
      if(this.picture.indexOf('http') != -1){
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
          this.errorMessage = error.message;
        }
      }
      else
        this.errorMessage = 'This isn\'t a valid URL, make sure it starts with "http" or "https"';
    }
    else
      this.errorMessage = "You didn't fill out all the fields, double check they're all complete!";
  }

  updateProfilePicture(){
    if(this.newImage.indexOf('http') != -1){
      this.afAuth.setUserPhotoURL(this.user.displayName, this.newImage).then(()=>{
        this.newImage = '';
        this.errorUpdateImage = '';
      })
      .catch((error)=> {
        this.errorUpdateImage = error.message;
      })
    }
    else
      this.errorUpdateImage = 'This isn\'t a valid URL, make sure it starts with "http" or "https"';

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


  
