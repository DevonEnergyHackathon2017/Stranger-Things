import { Component, OnInit } from '@angular/core';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  constructor(private service: Adal4Service, private http: Adal4HTTPService) { }

  ngOnInit() {
    // Handle callback if this is a redirect from Azure
    this.service.handleWindowCallback();
    // Check if the user is authenticated. If not, call the login() method
    if (!this.service.userInfo.authenticated) {
      this.service.login();
    }
  }
}
