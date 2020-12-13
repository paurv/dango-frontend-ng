import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  url = environment.urlServer;

  constructor( private httpClient: HttpClient ) { }

  getPlans(): Observable<any> {
    return this.httpClient.get(`${this.url}/plans`, {});
  }

  getPlan( idPlan ): Observable<any> {
    return this.httpClient.get(`${this.url}/plans/${ idPlan }`, {});
  }


}
