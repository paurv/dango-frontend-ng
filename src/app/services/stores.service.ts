import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  private url = environment.urlServer;
  private selectedPageId: string;
  private selectedPageName: string;

  constructor( private httpClient: HttpClient ) { }

  createStore( data, auth ): Observable <any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: auth,
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(`${ this.url }/stores`, data, { headers: httpHeaders });
  }

  getUserStore( auth ): Observable <any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: auth,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get(`${ this.url }/stores/user`, { headers: httpHeaders });
  }

  updateStore( auth ): Observable <any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: auth,
      'Content-Type': 'application/json'
    });
    return this.httpClient.put(`${ this.url }/stores/`, { headers: httpHeaders });
  }

  deletePage( idStore, auth, idPage ): Observable <any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: auth,
      'Content-Type': 'application/json'
    });
    return this.httpClient.put(`${ this.url }/stores/${ idStore }/page/${ idPage }`, null, { headers: httpHeaders });
  }

  createPage( idStore, auth, data ): Observable <any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: auth,
      'Content-Type': 'application/json'
    });
    return this.httpClient.put(`${ this.url }/stores/${ idStore }/page`, data, { headers: httpHeaders });
  }

  addCode( auth, idStore, idPage, data: any ): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: auth,
      'Content-Type': 'application/json'
    });
    return this.httpClient.put(`${ this.url }/stores/${ idStore }/pageEdition/${ idPage }`, data, { headers: httpHeaders });
  }

  getAllStores(): Observable <any> {
    return this.httpClient.get(`${ this.url }/stores`, {});
  }

  set page(page: string) {
    this.selectedPageId = page;
  }

  get page(): string {
    return this.selectedPageId;
  }

  set pageName( name: string) {
    this.selectedPageName = name;
  }

  get pageName(): string {
    return this.selectedPageName;
  }

}
