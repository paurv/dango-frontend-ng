import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private url = environment.urlServer;

  constructor( private httpClient: HttpClient ) { }

  getCategories( auth ): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: auth,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get( `${ this.url }/categ`, { headers: httpHeaders } );
  }

  addCateg( auth, data ): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: auth,
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(`${ this.url }/categ`, data, { headers: httpHeaders });
  }

  delCateg( auth, idCatg): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: auth,
      'Content-Type': 'application/json'
    });
    return this.httpClient.put(`${ this.url }/categ/${ idCatg }`, null, { headers: httpHeaders });
  }
}
