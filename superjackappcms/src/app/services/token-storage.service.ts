import { Injectable } from '@angular/core';

@Injectable({  providedIn: 'root'})
export class TokenStorage {

  /**
   * Get access token
   * @returns {Observable<string>}
   */
  public getAccessToken() {
    const token: string = <string>sessionStorage.getItem('accessToken');
    return token;
  }

  /**
   * Get refresh token
   * @returns {Observable<string>}
   */
  public getRefreshToken() {
    const token: string = <string>sessionStorage.getItem('refreshToken');
    return token;
  }

  public getAccessTokenExpiry() {
    const expiry: string = <string>sessionStorage.getItem('accessTokenExpiry');
    return expiry;
  }

  public getRefreshTokenExpiry() {
    const expiry: string = <string>sessionStorage.getItem('refreshTokenExpiry');
    return expiry;
  }

  public getLoginDetails(){
    const login: string = <string>sessionStorage.getItem('l');
    return login;
  }

  public setLoginDetails(login: string): TokenStorage {
    sessionStorage.setItem('l', login);

    return this;
  }

  /**
   * Set access token
   * @returns {TokenStorage}
   */
  public setAccessToken(token: string): TokenStorage {
    sessionStorage.setItem('accessToken', token);

    return this;
  }

   /**
   * Set refresh token
   * @returns {TokenStorage}
   */
  public setRefreshToken(token: string): TokenStorage {
    sessionStorage.setItem('refreshToken', token);

    return this;
  }

  public setAccessTokenExpiry(expiry: string): TokenStorage {
    sessionStorage.setItem('accessTokenExpiry', expiry);

    return this;
  }

  public setRefreshTokenExpiry(expiry: string): TokenStorage {
    sessionStorage.setItem('refreshTokenExpiry', expiry);

    return this;
  }

  public IsAccessTokenExpired(){
    var access = this.getAccessTokenExpiry();
    var expiration = new Date(access);
    return  expiration < new Date();
   
  }

  public IsRefreshTokenExpired(){
    var access = this.getRefreshTokenExpiry();
    var expiration = new Date(access);
    return  expiration < new Date();
   
  }


  public IsAuthorised(){
    var isexpired = this.IsAccessTokenExpired();
    //console.log("isexpired:", isexpired);
    if(isexpired){
      return false;
    }
   
    var atoken = this.getAccessToken();
    //console.log("atoken", atoken);
    var validToken = atoken != null;
    return validToken && !isexpired;
  }

  public IsRefreshAuthorised(){
    var isexpired = this.IsRefreshTokenExpired();
    var atoken = this.getRefreshToken();
    var validToken = atoken != null;
    return validToken && !isexpired;
  }


   /**
   * Remove tokens
   */
  public clear() {
    sessionStorage.removeItem('l');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessTokenExpiry');
    sessionStorage.removeItem('refreshTokenExpiry');
  }
}