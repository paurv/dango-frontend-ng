import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { PaginasComponent } from './components/dash-empresa/paginas/paginas.component';
import { BancoImagenesComponent } from './components/dash-empresa/banco-imagenes/banco-imagenes.component';
import { ProductosComponent } from './components/dash-empresa/productos/productos.component';
import { ConfiguracionComponent } from './components/dash-empresa/configuracion/configuracion.component';
import { ROUTES } from './app.routes';


// rutas


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    PaginasComponent,
    BancoImagenesComponent,
    ProductosComponent,
    ConfiguracionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( ROUTES, { useHash: true } )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
