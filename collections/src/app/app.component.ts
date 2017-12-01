import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { StreamSocket } from './ngWebSocket/stream-socket.service';
import { Dashboard } from './models/dashboard.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { observeOn } from 'rxjs/operator/observeOn';
import { Subscribable } from 'rxjs/Observable';
import { SpiderChartComponent } from './spider-chart/spider-chart.component';
import { GaugeComponent } from './gauge/gauge.component';
import { RateGaugeComponent } from './rate-gauge/rate-gauge.component';
import { Adal4Service } from 'adal-angular4';

const config: any = {
    tenant: '3b51b87c-ae84-4292-9dab-9bfc40c88c9c',
    clientId: '0960932c-f87b-4a42-8c4a-5365d0235f38',
    popUp: true
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  dashboard: any;
  authenticated: boolean;

  constructor(private service: Adal4Service) {
    this.service.init(config);
    this.authenticated = this.service.userInfo.authenticated;
  }

  ngOnDestroy() {

  }

  ngOnInit() {

  }
}
