import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { IUser } from '../interfaces';
import { IAuthData } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: IUser | null = null;

  constructor(private router: Router) { }

  registerUser(authData: IAuthData) {
    this.user = {
      email: authData.email,
      id: Math.round(Math.random() * 10000).toString()
    };

    this.successfulAuth();
  }

  login(authData: IAuthData) {
    this.user = {
      email: authData.email,
      id: Math.round(Math.random() * 10000).toString()
    };

    this.successfulAuth();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/auth/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user !== null;
  }

  private successfulAuth() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
