import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { User } from '../users/user';
//import { Observable } from '@firebase/util';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';



@Injectable()
export class DisplayService {
  //usersCollection: AngularFirestoreCollection<User>;
  public userList;
  public tmp;


  constructor(public afs:AngularFirestore) {
    const settings = { timestampsInSnapshots: true };
    afs.app.firestore().settings(settings);
    this.userList = afs.collection<any>('usersInfo');
   }


   getUserList(){
     return this.userList;
   }   

}