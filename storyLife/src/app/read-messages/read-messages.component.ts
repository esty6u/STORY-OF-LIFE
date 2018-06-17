import { Component, OnInit } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { DisplayService } from '../services/display.service';


@Component({
  selector: 'app-read-messages',
  templateUrl: './read-messages.component.html',
  styleUrls: ['./read-messages.component.css']
})
export class ReadMessagesComponent implements OnInit {
  messageL : Message[];

  constructor(private messageService: DisplayService) { }

  ngOnInit() {
    this.messageService.getMessageList().valueChanges().subscribe(messageList =>{
      this.messageL = messageList;
    })
  }

}
