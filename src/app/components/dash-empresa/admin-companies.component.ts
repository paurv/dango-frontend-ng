import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-companies',
  template: `
<app-navbar></app-navbar>


<div class="container-fluid" style="margin-top: 36px;" *ngIf="!(routerLocation.url === '/sitio-config')">
  <div class="row">
    <div class="col-sm-5 col-md-3 col-lg-2 d-md-block pl-0 pr-0">
      <app-sidebar></app-sidebar>
    </div>
    <div class="col-sm-6 col-md-8 ml-sm-auto col-lg-10 px-md-4 mt-5 mb-5">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>

<div class="container-fluid p-0" style="margin-top: 58px;" *ngIf="routerLocation.url === '/sitio-config'">
  <app-sitio-config></app-sitio-config>
</div>
  `,
  styles: [
  ]
})
export class AdminCompaniesComponent implements OnInit {

  constructor( public routerLocation: Router) { }

  ngOnInit(): void {
  }

}