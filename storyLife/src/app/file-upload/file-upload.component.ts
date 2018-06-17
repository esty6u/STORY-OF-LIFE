import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../users/user';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  ngOnInit() {
    //this.db.getLoggedInUser();
  
    if(<User>this.cookieService.getObject('user')!=undefined)
    {
         this.db.loggedInUser = <User>this.cookieService.getObject('user');
         if(this.db.loggedInUser.type==='תלמיד' || this.db.loggedInUser.type==='הורה')
             this.router.navigate(['/'])
    }
   else
       this.router.navigate(['/'])

  }

  // Main task 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(private storage: AngularFireStorage, 
    private af: AngularFirestore,
    private router: Router,
    private cookieService:CookieService,
    private db:DatabaseService
  ) { }

  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      const path = `pdf/${new Date().getTime()}_${file.name}`;

      // Totally optional metadata
      const customMetadata = { app: 'My AngularFire-powered PWA!' };
  
      // The main task
      this.task = this.storage.upload(path, file, { customMetadata })
  
      // Progress monitoring
      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges().pipe(
        tap(snap => {
          if (snap.bytesTransferred === snap.totalBytes) {
            // Update firestore on completion
            this.af.collection('pdf').add( { path, size: snap.totalBytes })
          }
        })
      )
    
  
      // The file's download URL
      this.downloadURL = this.task.downloadURL(); 
    }
    else{
    // The storage path
    const path = `photos/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.af.collection('photos').add( { path, size: snap.totalBytes })
        }
      })
    )
  

    // The file's download URL
    this.downloadURL = this.task.downloadURL(); 
  }
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }


}