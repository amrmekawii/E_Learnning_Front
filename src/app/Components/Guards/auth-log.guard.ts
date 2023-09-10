import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';


export const AuthLogGuard:  CanActivateFn  = (route, state) => {
  const authenticationService = inject(AuthenticationServiceService);
  const router = inject(Router);

  if (authenticationService.isLoggedIn$.value) {
    console.log(authenticationService.isLoggedIn$.value);
    console.log(authenticationService.isLoggedIn$);

    return true;

  }

    console.log(authenticationService.isLoggedIn$.value)
  router.navigateByUrl('/Login');
  return false;
};
