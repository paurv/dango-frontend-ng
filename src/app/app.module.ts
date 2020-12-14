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

// cliente
import { CompaniesComponent } from './components/client/companies/companies.component';

// codemirror
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';

import { HttpClientModule } from '@angular/common/http';
import { ShoppingcartComponent } from './components/client/shoppingcart/shoppingcart.component';
import { LandingComponent } from './components/landing/landing.component';

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
    UsuariosComponent,
    LoginComponent,
    SigninComponent,
    CompaniesComponent,
    ShoppingcartComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CodemirrorModule,
    RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
