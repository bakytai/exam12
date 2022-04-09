import { LoginError, RegisterError, User } from '../models/user.model';
import { Image } from '../models/image.model';

export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
  loginFacebookLoading: boolean,
  loginFacebookError: null | LoginError
}

export type ImageState = {
  images: Image[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  deleteLoading: boolean,
  deleteError: null | string
};

export type AppState = {
  users: UserState,
  images: ImageState
}
