import { Routes } from '@angular/router';

import { BancoImagenesComponent } from './banco-imagenes/banco-imagenes.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { PaginasComponent } from './paginas/paginas.component';
import { ProductosComponent } from './productos/productos.component';
import { SitioConfigComponent } from './sitio-config/sitio-config.component';


export const COMPANIES_ROUTES: Routes = [
    { path: 'paginas', component: PaginasComponent },
    { path: 'banco', component: BancoImagenesComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'configuracion', component: ConfiguracionComponent },
    { path: 'sitio-config', component: SitioConfigComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'paginas' }
];

// No se ocupa el for root porque no se quiere navegar al root
// export const APP_ROUTES = RouterModule.forRoot(APP_ROUTES);
