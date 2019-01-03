import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { AngularFireAuth} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) { }

  get user(){
    return this.afAuth.auth.currentUser;
  }

  registerUser(email: string, password: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string){
    return this. afAuth.auth.signInWithEmailAndPassword(email, password);
  }
}
