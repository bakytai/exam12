import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import {
  loginFacebookFailure,
  loginFacebookRequest, loginFacebookSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  logoutUserRequest,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './user.actions';
import { mergeMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { SocialAuthService } from 'angularx-social-login';
import { HelpersService } from '../services/helpers.service';

@Injectable()

export class UsersEffects {

  constructor(
    private actions: Actions,
    private usersService: UsersService,
    private router: Router,
    private helpers: HelpersService,
    private auth: SocialAuthService
  ) {
  }

  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.usersService.registerUser(userData).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Register successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(registerUserFailure)
    ))
  ))

  loginUser = createEffect(() => this.actions.pipe(
    ofType(loginUserRequest),
    mergeMap(({userData}) => this.usersService.login(userData).pipe(
      map(user => loginUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Login successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginUserFailure)
    ))
  ))

  loginFacebook  = createEffect(() => this.actions.pipe(
    ofType(loginFacebookRequest),
    mergeMap(({userSocial}) => this.usersService.loginWithFacebook(userSocial).pipe(
      map(user => loginFacebookSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Login from facebook successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginFacebookFailure)
    ))
  ))

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    mergeMap(() => {
      return this.usersService.logout().pipe(
        map(() => logoutUser()),
        tap(async () => {
          await this.auth.signOut();
          await this.router.navigate(['/']);
          this.helpers.openSnackbar('Logout successful')
        })
      );
    })
  ));
}
