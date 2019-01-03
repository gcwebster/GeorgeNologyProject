import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, timestamp } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';

export interface iPresent{
  newItem: string;
  nameFrom: string;
  nameTo: string;
  picture: string;
  rating: number;
  dateOpened: string;
  letterSent: boolean;
  userID: string;
}

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  public user;
 
  constructor(public db: AngularFirestore, public authService: AuthServiceService) {  }

  get presentsCollection(){
    return this.db.collection<iPresent>('presents',
    (ref) => ref.where('userID', '==', this.authService.user.uid)
    );
  }

  get presents(){
    return this.presentsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as iPresent;
        const id = a.payload.doc.id;
        return { id, ... data };
      }))
    );
  }

  createItem(newItem: string, nameFrom: string, nameTo: string, picture :string, rating: number, userID: string){
    let today = new Date();
    let date = today.getDate() + "/" +  (today.getMonth() + 1) + "/" + today.getFullYear();
    console.log("user id is " + userID);
    return this.presentsCollection.add({newItem: newItem, nameFrom: nameFrom, nameTo: nameTo, picture: picture, rating: rating, dateOpened: date, letterSent: false, userID: userID})
    .catch((error) => {
       console.error(error.message);
    });
  }

  deleteItem(id){
    return this.presentsCollection.doc(id).delete();
  }

  updateLetterSent(present){
    return this.presentsCollection.doc(present.id).update({letterSent: !(present.letterSent)});
  }
}