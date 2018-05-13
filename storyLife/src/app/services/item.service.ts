import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'Angularfire2/firestore'
import {Item} from '../modules/Item';
@Injectable()
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;

  constructor(public afs:AngularFirestore) { }

}

