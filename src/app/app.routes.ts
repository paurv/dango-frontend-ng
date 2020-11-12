import { Routes } from '@angular/router';

// Componente por carpeta
import { AdminCompaniesComponent } from './components/dash-empresa/admin-companies.component';
import { AdminComponent } from './components/admin/admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Rutas Hijas
import { COMPANIES_ROUTES } from './components/dash-empresa/companies.routes';
import { ADMIN_ROUTES } from './components/admin/admin.routes';


export const ROUTES: Routes = [
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