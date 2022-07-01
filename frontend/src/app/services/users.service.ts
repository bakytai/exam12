import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUserData, RegisterUserData, User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  registerUser(userData: RegisterUserData) {
    return this.http.post<User>(environment.apiUrl + '/users', userData);
  }

  login(userData: LoginUserData) {
    return this.http.post<User>(environment.apiUrl + '/users/sessions', userData);
  }

  loginWithFacebook(user: SocialUser) {
    return this.http.post<User>(environment.apiUrl + '/users/facebookLogin', {
      authToken: user.authToken,
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.photoUrl
    });
  }


  logout() {
    return this.http.delete(environment.apiUrl + '/users/sessions');
  }
}
