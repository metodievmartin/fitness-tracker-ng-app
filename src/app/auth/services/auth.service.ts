import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { IAuthData } from '../interfaces';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ExerciseService } from '../../training/services/exercise.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private exerciseService: ExerciseService
  ) {
  }

  initAuthListener() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.authChange.next(true);
        this.isAuthenticated = true;
        this.router.navigate(['/training']);
      } else {
        this.exerciseService.cancelSubscriptions();
        this.authChange.next(false);
        this.isAuthenticated = false;
        this.router.navigate(['/auth/login']);
      }
    });
  }

  registerUser(authData: IAuthData) {
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  login(authData: IAuthData) {
    this.fireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  logout() {
    this.fireAuth.signOut();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

}
