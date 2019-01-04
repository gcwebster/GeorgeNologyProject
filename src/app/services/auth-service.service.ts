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
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.afAuth.auth.signOut();
  }

  resetPassword(email: string){
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  setUserDisplayName(name: string){
    return this.afAuth.auth.currentUser.updateProfile({displayName: name, photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'});
  }

  setUserPhotoURL(name: string, photoURL: string){
    return this.afAuth.auth.currentUser.updateProfile({displayName: name, photoURL: photoURL});
  }
}
