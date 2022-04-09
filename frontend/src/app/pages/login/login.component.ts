import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { LoginError, LoginUserData } from '../../models/user.model';
import { AppState } from '../../store/type';
import { loginFacebookRequest, loginUserRequest } from '../../store/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | LoginError>;
  authStateSub!: Subscription;

  constructor(private store: Store<AppState>, private auth: SocialAuthService) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
  }

  ngOnInit(): void {
    this.authStateSub = this.auth.authState.subscribe((userSocial: SocialUser) => {
      console.log(userSocial)
      this.store.dispatch(loginFacebookRequest({userSocial}));
    });
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginUserRequest({userData}));
  }

  fbLogin() {
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }
}
