import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface iPresent{
  newItem: string;
  nameFrom: string;
  nameTo: string;
  picture: string;
  rating: number;
  dateOpened: string;
  letterSent: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  private itemsCollection: AngularFirestoreCollection<iPresent>;
 
  private items: Observable<iPresent[]>;
 
  constructor(db: AngularFirestore) {
    this.itemsCollection = db.collection<iPresent>('items');
 
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  createItem(newItem: string, nameFrom: string, nameTo: string, picture :string, rating: number){
    return this.itemsCollection.add({newItem: newItem, nameFrom: nameFrom, nameTo: nameTo, picture: picture, rating: rating, dateOpened: "today", letterSent: false}).catch((error) => { console.error("THIS IS AN IMPORTANT ERROR " + error.message)});
  }
}
