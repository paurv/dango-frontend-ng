import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoresService } from '../../../services/stores.service';
import { UsersService } from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  pageName = 'Configuracion de pagina';
  companyName: string;

  constructor( public routerLocation: Router,
               private usersService: UsersService,
               private storesService: StoresService,
               private authService: AuthService ) { }

  currentUser: any = {};
  ngOnInit(): void {
    this.usersService.getCurrentUser( localStorage.getItem('token') )
    .subscribe( resp => {
      // console.log(resp);
      this.currentUser = resp.user;
    }, err => {
      console.log(err);
    });

    // this.pageName = this.storesService.pageName;
    this.storesService.getUserStore( localStorage.getItem('token') )
    .subscribe( resp => {
      if ( resp.storeUser != null ) {
        this.companyName = resp.storeUser.name;
      }
    }, err => {
      console.log(err);
    });
  }

  logout(): void {
    this.authService.logOut();
    this.routerLocation.navigateByUrl('/login');
  }

  regresar(): void{
    this.routerLocation.navigate(['/admin-companies/paginas/']);
  }
}
