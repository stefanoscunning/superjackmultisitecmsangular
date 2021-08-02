import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { TokenStorage } from './token-storage.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  token: string | undefined;
  apiUrl: string = environment.api.url;
  constructor(private tokenStorage: TokenStorage,private http: HttpClient) {}

  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }


  login(username: string, password: string) {
    return this.http.post<any>(this.apiUrl + '/users/authenticate', { username: username, password: password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //localStorage.setItem('currentUser', JSON.stringify(user));
                sessionStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        }));
}

  signinUser(email: string, password: string) {
    
    if(email=="test" && password=="test"){
      var user1 = new User();
      user1.id = 1;
      user1.username = "test";
      this.tokenStorage.setAccessToken(JSON.stringify(user1));      
    }
    else if(email=="hr" && password=="hr"){
      var user2 = new User();
      user2.id = 2;
      user2.username = "hr";
      this.tokenStorage.setAccessToken(JSON.stringify(user2));
    }
  }

  logout() {   
    this.tokenStorage.clear();
    sessionStorage.removeItem('currentUser');
    this.token = undefined;
  }

  getToken() {    
    return this.token;
  }

  isAuthenticated() {
    let sessionUser = sessionStorage.getItem('currentUser')
    if(sessionUser!=null){
      let currentUser = JSON.parse(sessionUser!=null ? sessionUser : '');
      if(currentUser && currentUser.token){
          this.token = currentUser.token;            
      }
      if(this.token!=null){
        return true;
      }
       return false;
    }
    return false;
    
  }
}
