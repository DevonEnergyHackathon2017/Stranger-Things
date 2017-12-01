import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import * as Rx from 'rxjs/Rx';

@Injectable()
export class NgSocketsService {

  constructor() { }

  private subject: Rx.Subject<MessageEvent>;

  public connect(url: string): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this._create(url);
    }
    return this.subject;
  }

  private _create(url: string) {
    const ws = new WebSocket(url);
    ws.onopen = function(message) {
    };

    // bind events from sent from the socket
    const observable = Rx.Observable.create(
      (observable: Rx.Observer<MessageEvent>) => {
        ws.onmessage = observable.next.bind(observable);
        ws.onerror = observable.error.bind(observable);
        ws.onclose = observable.complete.bind(observable);

        return ws.close.bind(ws);
      }
    );

    // bind events to be sent to the socket
    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Rx.Subject.create(observer, observable);
  }
}
