import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { IAuthData } from '../interfaces';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ExerciseService } from '../../training/services/exercise.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../../shared/services/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private exerciseService: ExerciseService,
    private ui: UIService,
    private snackbar: MatSnackBar
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
    this.ui.loadingStateChanged.next(true);
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.ui.loadingStateChanged.next(false);
        console.log(res);
      })
      .catch(err => {
        this.ui.loadingStateChanged.next(false);
        this.snackbar.open(err.message, undefined, {
          duration: 3000
        });
      });
  }

  login(authData: IAuthData) {
    this.ui.loadingStateChanged.next(true);
    this.fireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.ui.loadingStateChanged.next(false);
        console.log(res);
      })
      .catch(err => {
        this.ui.loadingStateChanged.next(false);
        this.snackbar.open(err.message, undefined, {
          duration: 4000
        });
      });
  }

  logout() {
    this.fireAuth.signOut();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

}
