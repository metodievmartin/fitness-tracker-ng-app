import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UIService } from '../../../shared/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  isLoadingSubscription = new Subscription();

  constructor(
    private uiService: UIService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoadingSubscription = this.uiService.loadingStateChanged
      .subscribe(state => {
      this.isLoading = state;
    });
  }

  onSubmit(f: NgForm) {
    this.authService.login({
      email: f.value.email,
      password: f.value.password
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription.unsubscribe();
  }
}
