import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');


    console.log("Soy token de autoFGUARDA . .", token);

    

    if (token) {
      return true;
    } else {
      this.router.navigate(['/inicio']);
      return false;
    }
  }
}
