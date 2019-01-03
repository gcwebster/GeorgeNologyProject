import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router
  ) { }

  public canActivate(): Observable<boolean>{
    return this.firebaseAuth.authState.pipe(
      map(
        (user) => {
          if(user){
            return true;
          }
          else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      ),
    first(),
    );
  }
}
