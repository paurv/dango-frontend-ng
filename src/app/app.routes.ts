import { Routes } from '@angular/router';
import { BancoImagenesComponent } from './components/dash-empresa/banco-imagenes/banco-imagenes.component';
import { ConfiguracionComponent } from './components/dash-empresa/configuracion/configuracion.component';
import { PaginasComponent } from './components/dash-empresa/paginas/paginas.component';
import { ProductosComponent } from './components/dash-empresa/productos/productos.component';
import { SitioConfigComponent } from './components/dash-empresa/sitio-config/sitio-config.component';

export const ROUTES: Routes = [
    { path: 'banco', component: BancoImagenesComponent },
    { path: 'configuracion', component: ConfiguracionComponent },
    { path: 'paginas', component: PaginasComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'sitio-config', component: SitioConfigComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'paginas' }
];

// export const appRouting = RouterModule.forRoot(app_routes);
