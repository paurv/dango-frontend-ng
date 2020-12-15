import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = environment.urlServer;

  constructor( private httpClient: HttpClient ) { }

  getProducts( auth ): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: auth,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get( `${ this.url }/products`, { headers: httpHeaders } );
  }

  addProduct( auth, data ): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: auth,
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(`${ this.url }/products`, data, { headers: httpHeaders } );
  }

  delProduct( auth, idProd ): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: auth,
      'Content-Type': 'application/json'
    });
    return this.httpClient.put(`${ this.url }/products/${ idProd }`, null, { headers: httpHeaders } );
  }
}
