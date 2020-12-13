import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoresService } from '../../../services/stores.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  pageName = 'Configuracion de pagina';

  constructor( public routerLocation: Router,
               private usersService: UsersService,
               private storesService: StoresService ) { }

  currentUser: any = {};
  ngOnInit(): void {
    console.log('nombre pag: ', this.pageName);
    this.usersService.getCurrentUser( localStorage.getItem('token') )
    .subscribe( resp => {
      // console.log(resp);
      this.currentUser = resp.user;
    }, err => {
      console.log(err);
    });
    this.pageName = this.storesService.pageName;
  }

  regresar(): void{
    this.routerLocation.navigate(['/admin-companies/paginas/']);
  }
}
