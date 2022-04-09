import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { RegisterError, RegisterUserData } from 'src/app/models/user.model';

import { loginFacebookRequest, registerUserRequest } from '../../store/user.actions';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AppState } from '../../store/type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  authStateSub!: Subscription;
  error: Observable<null | RegisterError>;
  errorSub!: Subscription;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>, private auth: SocialAuthService) {
    this.error = store.select(state => state.users.registerError);
    this.loading = store.select(state => state.users.registerLoading);
  }

  ngAfterViewInit() {
    this.errorSub = this.error.subscribe(error => {
      if (error) {
        const msg = error.errors.email.message;
        this.form.form.get('email')?.setErrors({serverError: msg});
      } else {
        this.form.form.get('email')?.setErrors({});
      }
    });

    this.authStateSub = this.auth.authState.subscribe((userSocial: SocialUser) => {
      this.store.dispatch(loginFacebookRequest({userSocial}));
    });
  }

  onSubmit() {
    const userData: RegisterUserData = this.form.value;
    this.store.dispatch(registerUserRequest({userData}));
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  fbLogin() {
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
