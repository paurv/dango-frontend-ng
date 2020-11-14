import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( public routerLocation: Router) { }

  ngOnInit(): void { }

  regresar(){
    this.routerLocation.navigate(['/admin-companies/paginas/']);
  }
}
