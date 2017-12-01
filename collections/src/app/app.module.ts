import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { StreamSocket } from './ngWebSocket/stream-socket.service';
import { NgSocketsService } from './ngWebSocket/ng-web-socket.service';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { SpiderChartComponent } from './spider-chart/spider-chart.component';
import { GaugeComponent } from './gauge/gauge.component';
import { RateGaugeComponent } from './rate-gauge/rate-gauge.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { Routes, RouterModule } from '@angular/router';

import { Adal4Service, Adal4HTTPService } from 'adal-angular4';
import { StreamComponent } from './stream/stream.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HomeComponent } from './home/home.component';

declare var require: any;

export function highchartsFactory() {
  const hc = require('highcharts');
  const hcm = require('highcharts/highcharts-more');
  const exp = require('highcharts/modules/exporting');
  const sg = require('highcharts/modules/solid-gauge');

  hcm(hc);
  exp(hc);
  sg(hc);
  return hc;
}

const routes: Routes = [
  { path: 'stream', component: StreamComponent },
  { path: 'board', component: LeaderboardComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GaugeComponent,
    RateGaugeComponent,
    SpiderChartComponent,
    StreamComponent,
    LeaderboardComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ChartModule,
    HttpClientModule,
    NgxGaugeModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    StreamSocket,
    NgSocketsService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    Adal4Service,
    {
      provide: Adal4HTTPService,
      useFactory: Adal4HTTPService.factory,
      deps: [HttpClient, Adal4Service]
    }
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
