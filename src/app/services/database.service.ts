import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  createItem(newItem){
    console.log('Create item called with ' + newItem);
  }
}
