import { Routes } from '@angular/router';

import { AdminCompaniesComponent } from './components/dash-empresa/admin-companies.component';
import { AdminComponent } from './components/admin/admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';



// importar las rutas hijas de companies.routes.ts
import { COMPANIES_ROUTES } from './components/dash-empresa/companies.routes';
import { ADMIN_ROUTES } from './components/admin/admin.routes';



export const ROUTES: Routes = [
    // { path: 'banco', component: BancoImagenesComponent },
    // { path: 'configuracion', component: ConfiguracionComponent },
    // { path: 'paginas', component: PaginasComponent },
    // { path: 'productos', component: ProductosComponent },
    // { path: 'sitio-config', component: SitioConfigComponent },

    {
        path: 'admin-companies',
        component: AdminCompaniesComponent,
        children: COMPANIES_ROUTES
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: ADMIN_ROUTES
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'not-found' },
];

// export const appRouting = RouterModule.forRoot(app_routes);
