import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';
import { Router } from '@angular/router';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor(private adalService: Adal4Service,
    private router: Router) {

  }
  canActivate() {
    if (this.adalService.userInfo.authenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
