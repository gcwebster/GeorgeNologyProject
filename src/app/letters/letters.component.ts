import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthServiceService } from '../services/auth-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.css']
})
export class LettersComponent implements OnInit {

  user;
  presents: Observable<any[]>;
  constructor(public db: AngularFirestore, public afAuth: AuthServiceService, public router: Router, public dbService: DatabaseService) {
    this.presents = dbService.presents;
    this.user = this.afAuth.user;
  }

  ngOnInit() {
  }

  updateLetter(present){
    this.dbService.updateLetterSent(present).catch((error) =>{
      console.error(error.message);
    });;
  }

}
