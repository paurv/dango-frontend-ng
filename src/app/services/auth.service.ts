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

  // verUrl(): void {
  //   console.log(this.url);
  // }

  // create new user
  signIn( data: userModel ): Observable<any> {
    console.log( data );
    return this.httpClient.post(`${this.url}/auth/register`, data);
  }

  login( data: any ): Observable<any> {
    return this.httpClient.post(`${this.url}/auth/login`, data )
          .pipe(
            map( resp => {  // no se dispara en error
              console.log('entro en mapa rxjs');
              this.saveToken( resp['token'] );
              return resp;
            })
          );
  }

  logOut(): Observable<any> {
    return this.httpClient.get('', {});
  }

  private saveToken( token: string ): void {
    this.userToken = token;
    localStorage.setItem('token', token);
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
