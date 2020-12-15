import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { userModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.urlServer;
  userToken: string;

  constructor( private httpClient: HttpClient ) {
    this.readToken();
  }

  verUrl(): void {
    console.log(this.url);
  }

  // create new user
  signIn( data: userModel ): Observable<any> {
    return this.httpClient.post(`${this.url}/auth/register`, data)
          .pipe(
            map( resp => {
              console.log('entro en para de signIn');
              this.saveToken(resp['token']);
              return resp;
            })
          );
  }

  login( data: any ): Observable<any> {
    return this.httpClient.post(`${this.url}/auth/login`, data )
          .pipe(
            map( resp => {                                        // no se dispara en error
              this.saveToken( resp['token'] );                    // tslint:disable-line
              return resp;
            })
          );
  }

  checkEmail( data: any ): Observable<any> {
    return this.httpClient.put(`${this.url}/auth/`, data);
  }

  // falta
  logOut(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    if ( this.userToken.length < 2 ) {
      return false;
    }
    const expires = Number(localStorage.getItem('expires'));
    const expireToday = new Date();
    expireToday.setTime(expires);
    // return this.userToken.length > 2;
    if ( expireToday > new Date() ) {
      return true;
    } else {
      return false;
    }
  }

  private saveToken( token: string ): void {
    this.userToken = token;
    localStorage.setItem('token', token);

    const today = new Date();
    today.setSeconds( 3600 );

    localStorage.setItem( 'expires', today.getTime().toString() );
  }

  private readToken(): string {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
}
