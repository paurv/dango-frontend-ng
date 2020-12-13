import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = environment.urlServer;

  constructor( private httpClient: HttpClient ) { }

  getCurrentUser( token ): Observable <any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get(`${this.url}/user/userid`, { headers: httpHeaders });
  }
}
