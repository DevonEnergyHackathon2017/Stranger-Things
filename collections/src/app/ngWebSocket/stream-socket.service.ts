import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject } from 'rxjs/Rx';
import { NgSocketsService } from './ng-web-socket.service';
import { Dashboard } from '../models/dashboard.model';

@Injectable()
export class StreamSocket {
  public messages: Subject<Dashboard>;

  constructor(ngSocketService: NgSocketsService) {
    this.messages = <Subject<Dashboard>> ngSocketService
      .connect('ws://stranger-things-eventhubapi-test.azurewebsites.net/dataevent')
      .map((response: MessageEvent): Dashboard => {
        const data = JSON.parse(response.data);
        if ( typeof(data) === 'string' && data.includes('connect||')) {
          return null;
        }
        return data;
      });
  }
}
