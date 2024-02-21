import { Injectable, inject } from '@angular/core';
import {  CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';


export const AdminGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationServiceService);
  const router = inject(Router);

  if (authenticationService.isLoggedIn$.value) {
  
    if(authenticationService.UserData.role=='Admin')
    {
      return true;

    }
    else{
      router.navigateByUrl('');
    return false
    }

  }

  console.log(authenticationService.isLoggedIn$.value)
  router.navigateByUrl('/Login');
  return false;
};


export const ParentGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationServiceService);
  const router = inject(Router);

  if (authenticationService.isLoggedIn$.value) {
  
    if(authenticationService.UserData.role=='Parent')
    {
      return true;

    }
    else{
      router.navigateByUrl('');
    return false
    }

  }

  console.log(authenticationService.isLoggedIn$.value)
  router.navigateByUrl('/Login');
  return false;
};