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
  private presentsCollection: AngularFirestoreCollection<iPresent>;
 
  public presents: Observable<iPresent[]>;
 
  constructor(db: AngularFirestore) {
    this.presentsCollection = db.collection<iPresent>('presents');
    this.presents = this.presentsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as iPresent;
        const id = a.payload.doc.id;
        return { id, ... data };
      }))
    );
  }

  includeCollectionID(doChangeAction){
    return doChangeAction.map((a)=> {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    })
  }

  createItem(newItem: string, nameFrom: string, nameTo: string, picture :string, rating: number){
    return this.presentsCollection.add({newItem: newItem, nameFrom: nameFrom, nameTo: nameTo, picture: picture, rating: rating, dateOpened: "today", letterSent: false}).catch((error) => { console.error("THIS IS AN IMPORTANT ERROR " + error.message)});
  }

  deleteItem(id){
    return this.presentsCollection.doc(id).delete();
  }

  updateLetterSent(present){
    return this.presentsCollection.doc(present.id).update({letterSent: !(present.letterSent)});
  }
}