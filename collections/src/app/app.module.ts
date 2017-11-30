import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { StreamSocket } from './ngWebSocket/stream-socket.service';
import { NgSocketsService } from './ngWebSocket/ng-web-socket.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [
    StreamSocket,
    NgSocketsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
