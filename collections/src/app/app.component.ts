import { Component } from '@angular/core';
import { StreamSocket } from './ngWebSocket/stream-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private streamService: StreamSocket) {
    this.streamService.messages.subscribe(data => {
      console.log(data);
    });
  }
}
