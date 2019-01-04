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
  i = -1;
  christmasCards = [
    'https://images-na.ssl-images-amazon.com/images/I/61vQuriN1TL._SY355_.jpg',
    'http://canyouactually.com/wp-content/uploads/5-333.jpg',
    'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1538574368-MIN-ZRF-HNP-001HOLIDAY_A_PZ.jpg?crop=0.667xw:1xh;center,top&resize=480:*',
    'https://i.ebayimg.com/images/g/xTcAAOSwa3BaEEh4/s-l300.jpg',
    'https://www.funkypigeon.com/uimg/christmas04/card_rachhale_xmas17_dachshund_3160_p.jpg'
  ];
  user;
  presents: Observable<any[]>;
  constructor(public db: AngularFirestore, public afAuth: AuthServiceService, public router: Router, public dbService: DatabaseService) {
    this.presents = dbService.presents;
    this.user = this.afAuth.user;
  }

  ngOnInit() {
  }

  getCardFace() {
    if (this.i > 3) {
      this.i = -1;
    }
    this.i++;
    console.log('value of i is: ' + this.i + ' card at that position is: ' + this.christmasCards[this.i]);
    return this.christmasCards[this.i];
  }

}
