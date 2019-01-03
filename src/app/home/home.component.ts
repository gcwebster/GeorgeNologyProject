import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user;

  items: Observable<any[]>;
  constructor(public db: AngularFirestore, public afAuth: AuthServiceService) {
    this.items = db.collection('items').valueChanges();
    this.user = this.afAuth.user;

  }

  ngOnInit() {
    this.user = this.afAuth.user;
    console.error(this.user.email);
  }

}


  
