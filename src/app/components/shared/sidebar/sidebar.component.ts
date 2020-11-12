import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  ubicacion: string;
  dashboard: string;
  constructor( public routerLocationAdm: Router ) {
    this.ubicacion = routerLocationAdm.url;
    const partes: string[] = this.ubicacion.split('/');
    this.dashboard = partes[1];
    console.log(this.dashboard);
  }

  ngOnInit(): void {
  }

}
