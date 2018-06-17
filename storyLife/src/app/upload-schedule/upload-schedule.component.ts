import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';
import { DatabaseService } from '../services/database.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload-schedule',
  templateUrl: './upload-schedule.component.html',
  styleUrls: ['./upload-schedule.component.css']
})
export class UploadScheduleComponent {

  emailVaild=true;

  // Main task 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore,
    private dbService : DatabaseService, private _firebaseAuth:AngularFireAuth, private cookieService:CookieService,private router:Router ) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList,formData) {
    this.dbService.checkIfUserEmailIsVaild(formData.value.email); 
    if(this.dbService.valid)
    {
      this.emailVaild=true;
    // The File object
    const file = event.item(0)

    // Client-side validation example
   ////////////////////////////////////// if (file.type.split('/')[0] !== 'image') { 
      const path = `Schedules/${new Date().getTime()}_${file.name}`;

      // Totally optional metadata
      const customMetadata = { userMail: formData.value.email };

      // The main task
      this.task = this.storage.upload(path, file, { customMetadata })
  
      // Progress monitoring
      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges().pipe(
        tap(snap => {
          if (snap.bytesTransferred === snap.totalBytes) {
            // Update firestore on completion
            this.db.collection('Schedules').add( { path, size: snap.totalBytes,email:formData.value.email })
          }
        })
      )
    
  
      // The file's download URL
      this.downloadURL = this.task.downloadURL(); 
      
      

   ///////////////////////////////// }


 
    }
    else
      this.emailVaild=false;

  }

  finishUpdate(formData,linkUrl)
  {
    this.dbService.updateSchedule(formData.value.email,linkUrl);
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }


  logout() 
  {

    this.cookieService.putObject('user',undefined);

    this._firebaseAuth.auth.signOut()
    

    .then((res) => {  

      alert("יצא"+this.dbService.loggedInUser.email)
    this.dbService.loggedInUser.loggedIn = false;
    this.dbService.updateListing(this.dbService.loggedInUser.uid);
    this.dbService.loggedIn = 'false';
     this.router.navigate(['/'])
     


  })
    .catch((err) =>{
    console.log(err + "")
   // this.db.loggedInUser.loggedIn = true;
    // this.db.updateListing(this.db.loggedInUser.uid);
    }
    
    );
  }

}