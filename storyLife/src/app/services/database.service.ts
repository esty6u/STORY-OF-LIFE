import { Injectable } from '@angular/core';
import { User } from '../users/user';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AlertPromise, Key } from 'selenium-webdriver';
import { AuthService } from './auth.service';
import { Message } from '../messages/message';
//import { userInfo } from 'os';

@Injectable()
export class DatabaseService {
  
  valid=true;
  public dataCollections; //will hold the DB collection table that is stored in the firebase 
  public messageCollections; //will hold the DB message collection table that is stored in the firebase 
  public registeredUsers; //a string that holds information that was collected from getAllDBUsers() function
  public user: User; //will hold the data that was collected from a user that wants to register to the website
  public loggedInUserUID: string; //only holds logged in uniqe users id
  public loggedInUser: User; // holds logged in user info 
  public loggedIn: string; //check if this is the right way to do
  listingDoc: AngularFirestoreDocument<User>; //holds FB listing for update operation
  public usersUpdate;// for update atribut in user 
  public message: Message;
  public msginfo;
  private tempUsr:User;
  public userpass: User; // holds logged in user info 
  public Schedules;

  constructor(private afs: AngularFirestore,private auth:AuthService) {
    //==========Connection to firebase table============//
    const settings = { timestampsInSnapshots: true };
    afs.app.firestore().settings(settings);
    this.dataCollections = afs.collection<any>('usersInfo');
    this.Schedules=afs.collection<any>('Schedules')
    this.messageCollections =afs.collection<any>('msgInfo');
    this.usersUpdate = afs.collection<any>('usersInfo');
    //===================================================//
    this.registeredUsers = "";
    this.loggedIn = 'false';
  }

  //adds all info that was provided through the registration form to user object and ads it to the firebase DB
  public addUserToDB(user: User) {
    this.dataCollections.add(JSON.parse(JSON.stringify(user)));
  }
  public addMessageToDB(message: Message) {
    this.messageCollections.add(JSON.parse(JSON.stringify(message)));
  }

  /*public addProUserToDB(a) {
    this.dataCollections.add(JSON.parse(JSON.stringify(a)));
  }*/
  //updates users info that was found by email. New data is stored in the "loggedInUser" object
  updateListing(uid: string) {
    this.afs.collection("usersInfo").snapshotChanges().map(actions => { //collects the DB table meta data including all table fields id and users
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
      //searches through the collectes list of user the current user to update
    }).subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.uid ==this.loggedInUser.uid) {
          this.listingDoc = this.afs.doc(`usersInfo/${doc.id}`); //takes the listing that will be updated by the doc.id (listing's id)
          this.listingDoc.update(JSON.parse(JSON.stringify(this.loggedInUser))); //finaly updates the listing
        }
      });
    });
  }
//currently a temp function that stores basic users information that is found at the FBDB.
  public getAllDBUsers() {
    this.dataCollections.valueChanges().subscribe(collection => {
      for (var i = 0; i < collection.length; i++) {
        this.registeredUsers += "   email:   " + collection[i].email + "\n   password:   " + collection[i].password + "\n   uid:   " + collection[i].uid + "   \n\n   ";
      }
    })
  }
  //returns the currently logged in user by his uid
  public getLoggedInUser() {
    return new Promise((resolve, reject) => {

    this.dataCollections.valueChanges().subscribe(collection => {
      for (var i = 0; i < collection.length; i++) 
      {
        if (collection[i].uid === this.loggedInUserUID)
        {
          this.loggedInUser = collection[i];
          //this.loggedIn = 'true';
          resolve();
          return;
        }
      }
      resolve();
      })

    })
  }

  public deleteUserFromDB(user: User){
    this.afs.collection("usersInfo").snapshotChanges().map(actions => { //collects the DB table meta data including all table fields id and users
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
      //searches through the collectes list of user the current user to update
    }).subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.email == user.email) {
          this.listingDoc = this.afs.doc(`usersInfo/${doc.id}`); //takes the listing that will be updated by the doc.id (listing's id)
          this.listingDoc.delete(); //finaly updates the listing
        }
      });
    });
    this.auth.deleteUserFromAuth(user.email);

}

public deleteMsgFromDB(message: Message)
{
  this.afs.collection("msgInfo").snapshotChanges().map(actions => { //collects the DB table meta data including all table fields id and users
    return actions.map(a => {
      const data = a.payload.doc.data() as Message;
      const id = a.payload.doc.id;
      return { id, ...data };
    });
    //searches through the collectes list of user the current user to update
  }).subscribe((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.date==message.date) {
        this.listingDoc = this.afs.doc(`msgInfo/${doc.id}`); //takes the listing that will be updated by the doc.id (listing's id)
        this.listingDoc.delete(); //finaly updates the listing
      }
    });
  });
}


public freezeUserFromDB(user: User){
  /*this.afs.collection("usersInfo").snapshotChanges().map(actions => { //collects the DB table meta data including all table fields id and users
    return actions.map(a => {
      const data = a.payload.doc.data() as User;
      const id = a.payload.doc.id;
      return { id, ...data };
    });
    //searches through the collectes list of user the current user to update
  }).subscribe((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.email == user.email) {
        ??this.listingDoc = this.afs.doc(`usersInfo/${doc.id}`); //takes the listing that will be updated by the doc.id (listing's id)
        ??this.listingDoc.update(JSON.parse(JSON.stringify(this.loggedInUser))); //finaly updates the listing
      }
    });
  });*/
  
}

public resetUserPasswordFromDB(user: User){
  

  this.afs.collection("usersInfo").snapshotChanges().map(actions => { //collects the DB table meta data including all table fields id and users
    return actions.map(a => {
      const data = a.payload.doc.data() as User;
      const id = a.payload.doc.id;
      return { id, ...data };
    });
    //searches through the collectes list of user the current user to update
  }).subscribe((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.email == user.email) {
        this.listingDoc = this.afs.doc(`usersInfo/${doc.id}`); //takes the listing that will be updated by the doc.id (listing's id)
        this.listingDoc.update(JSON.parse(JSON.stringify(this.userpass))); //finaly updates the listing
      }
    });
  });
}

getusersupdate()
{
  return this.dataCollections;
}
getuserpass()
{
  return this.userpass;
}

public updateStudentStrengths(str1: string[], str2: string[]) {
  this.afs.collection('usersInfo').snapshotChanges().map(actions => {
    /*collects the DB table meta data including all table fields id and users*/
    return actions.map(a => {
      const data = a.payload.doc.data() as User;
      const id = a.payload.doc.id;
      return { id, ...data };
    });
    /*searches through the collectes list of user the current user to update*/
  }).subscribe((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.uid === this.loggedInUser.uid) {
        this.loggedInUser.myStrengths = str1;
        this.loggedInUser.mySurvey = str2;
        this.loggedInUser.SurveyCompleted = true;
        this.listingDoc = this.afs.doc(`usersInfo/${doc.id}`); /*takes the listing that will be updated by the doc.id (listing's id)*/
        this.listingDoc.update(JSON.parse(JSON.stringify(this.loggedInUser))); /*finaly updates the listing*/
      }
    });
  });
}
public uploadLinkedUsersToDatabase() {
  this.afs.collection('usersInfo').snapshotChanges().map(actions => {
    //collects the DB table meta data including all table fields id and users
    return actions.map(a => {
      const data = a.payload.doc.data() as User;
      const id = a.payload.doc.id;
      return { id, ...data };
    });
    //searches through the collectes list of user the current user to update
  }).subscribe((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.email === this.userpass.email) {
        this.listingDoc = this.afs.doc(`usersInfo/${doc.id}`); //takes the listing that will be updated by the doc.id (listing's id)
        this.listingDoc.update(JSON.parse(JSON.stringify(this.userpass))); //finaly updates the listing
      }
    });
  });
}
public checkIfUserEmailIsVaild(inputEmail)
{
  
  return new Promise((resolve, reject) => {

    this.dataCollections.valueChanges().subscribe(collection => {
      
      
      for (var i = 0; i < collection.length; i++) 
      
        if(collection[i].email==inputEmail)
         this.valid =true;
        this.valid =false;
      resolve();
      
      })

    })

}
public updateSchedule(inputEmail,link)
{
  this.dataCollections.valueChanges().subscribe(collection => {
    alert("aaaaaaaaaa")
    alert(inputEmail)


      this.dataCollections.valueChanges().subscribe(collection => {
        
        
        for (var i = 0; i < collection.length; i++) 
        {
         if(collection[i].email==inputEmail)
         {
          this.tempUsr=collection[i];
          this.tempUsr.scheduleLink=link;
          debugger
          this.updateOtherListing(this.tempUsr,this.tempUsr.uid)
         }
        }
        })

  })
}
updateOtherListing(tempUser: User,uid: string) {
  this.afs.collection("usersInfo").snapshotChanges().map(actions => { //collects the DB table meta data including all table fields id and users
    return actions.map(a => {
      const data = a.payload.doc.data() as User;
      const id = a.payload.doc.id;
      return { id, ...data };
    });
    //searches through the collectes list of user the current user to update
  }).subscribe((querySnapshot) => {
    querySnapshot.forEach((doc) => {
     
      if (doc.uid == uid) {
        this.listingDoc = this.afs.doc(`usersInfo/${doc.id}`); //takes the listing that will be updated by the doc.id (listing's id)
        this.listingDoc.update(JSON.parse(JSON.stringify(tempUser))); //finaly updates the listing
      }
    });
  });
}
}