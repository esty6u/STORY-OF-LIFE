import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../services/display.service';
import { Message } from '../messages/message';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-delete-message',
  templateUrl: './delete-message.component.html',
  styleUrls: ['./delete-message.component.css']
})
export class DeleteMessageComponent implements OnInit {
  messageL : Message[];
  message: Message;

  constructor(private messageService: DisplayService , public db: DatabaseService) {
    this.message= new Message();
   }

  ngOnInit() {
    this.messageService.getMessageList().valueChanges().subscribe(messageList =>{
      this.messageL = messageList;
    })
  }

  msgDelete(date){
   
  for(var i=0;i<this.messageL.length;i++)
  {
    if(this.messageL[i].date==date)
    {
      this.db.deleteMsgFromDB(this.messageL[i]);
      return;
    }
  }
  }
}

