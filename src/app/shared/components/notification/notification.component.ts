import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../core/services/notification.service";
import {Observable} from "rxjs";
import {Notify} from "../../../core/models/notify.models";

@Component({
  selector: 'tl-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notify$?: Observable<Notify | null>

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    // subscribe
   this.notify$ = this.notificationService.notify$
  }

  closeNotification() {
    this.notificationService.clear()
  }

}
