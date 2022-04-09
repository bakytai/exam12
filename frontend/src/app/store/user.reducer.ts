import { createReducer, on } from '@ngrx/store';
import {
  loginFacebookFailure,
  loginFacebookRequest, loginFacebookSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess, logoutUser,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './user.actions';
import { UserState } from './type';

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  loginFacebookLoading: false,
  loginFacebookError: null
};

export const usersReducer = createReducer(
  initialState,
  on(registerUserRequest, state => ({...state, registerLoading: true, registerError: null})),
  on(registerUserSuccess, (state, {user}) => ({...state, registerLoading: false, user})),
  on(registerUserFailure, (state, {error}) => ({...state, registerLoading: false, registerError: error})),
  on(loginUserRequest, state => ({...state, loginLoading: true, loginError: null,})),
  on(loginUserSuccess, (state, {user}) => ({...state, loginLoading: false, user})),
  on(loginUserFailure, (state, {error}) => ({...state, loginLoading: false, loginError: error})),
  on(logoutUser, state => ({...state, user: null,})),
  on(loginFacebookRequest, state => ({...state, loginFacebookLoading: true, loginFacebookError: null,})),
  on(loginFacebookSuccess, (state, {user}) => ({...state, loginFacebookLoading: false, user})),
  on(loginFacebookFailure, (state, {error}) => ({...state, loginFacebookLoading: false, loginFacebookError: error}))
);
