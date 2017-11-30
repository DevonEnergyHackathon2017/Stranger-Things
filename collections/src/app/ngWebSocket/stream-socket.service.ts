import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject } from 'rxjs/Rx';
import { NgSocketsService } from './ng-web-socket.service';

export class TestObject {
  Id: Number;
  Description: String;
  Uuid: String;
}

@Injectable()
export class StreamSocket {
  public messages: Subject<TestObject>;

  constructor(ngSocketService: NgSocketsService) {
    this.messages = <Subject<TestObject>> ngSocketService
      .connect('ws://stranger-things-eventhubapi-test.azurewebsites.net/dataevent')
      .map((response: MessageEvent): TestObject => {
        const data = JSON.parse(response.data);
        if ( typeof(data) === 'string' && data.includes('connect||')) {
          console.log(data.replace('connect||', ''));
          return null;
        }
        return data;
      });
  }
}
