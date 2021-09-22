import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date;
  isLoading = false;
  isLoadingSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
  ) {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -14 );
  }

  ngOnInit(): void {
    this.isLoadingSubscription = this.uiService.loadingStateChanged
      .subscribe(state => {
        this.isLoading = state;
      });
  }

  onSubmit(f: NgForm) {
    this.authService.registerUser({
      email: f.value.email,
      password: f.value.password
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription?.unsubscribe();
  }
}
