import { Component, OnInit } from '@angular/core';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service: Adal4Service, private http: Adal4HTTPService, private router: Router) { }

  ngOnInit() {
        // Handle callback if this is a redirect from Azure
        this.service.handleWindowCallback();
        // Check if the user is authenticated. If not, call the login() method
        if (!this.service.userInfo.authenticated) {
          this.service.login();
          this.router.navigate(['/stream']);
        }
  }
}
