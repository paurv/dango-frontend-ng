import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

// shared
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';

// rutas
import { ROUTES } from './app.routes';

// pipes
import { TransRutaPipe } from './pipes/trans-ruta.pipe';

// empresas
import { PaginasComponent } from './components/dash-empresa/paginas/paginas.component';
import { BancoImagenesComponent } from './components/dash-empresa/banco-imagenes/banco-imagenes.component';
import { ProductosComponent } from './components/dash-empresa/productos/productos.component';
import { ConfiguracionComponent } from './components/dash-empresa/configuracion/configuracion.component';
import { SitioConfigComponent } from './components/dash-empresa/sitio-config/sitio-config.component';
import { AdminCompaniesComponent } from './components/dash-empresa/admin-companies.component';

// admin
import { EmpresasComponent } from './components/admin/empresas/empresas.component';
import { AdminComponent } from './components/admin/admin.component';
import { PlanesComponent } from './components/admin/planes/planes.component';
import { TemasComponent } from './components/admin/temas/temas.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    PaginasComponent,
    BancoImagenesComponent,
    ProductosComponent,
    ConfiguracionComponent,
    SitioConfigComponent,
    TransRutaPipe,
    AdminCompaniesComponent,
    EmpresasComponent,
    AdminComponent,
    PlanesComponent,
    TemasComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( ROUTES )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
