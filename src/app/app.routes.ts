import { Routes } from '@angular/router';

// Componente por carpeta
import { AdminCompaniesComponent } from './components/dash-empresa/admin-companies.component';
import { AdminComponent } from './components/admin/admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Rutas Hijas
import { COMPANIES_ROUTES } from './components/dash-empresa/companies.routes';
import { ADMIN_ROUTES } from './components/admin/admin.routes';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { CompaniesComponent } from './components/client/companies/companies.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';



export const ROUTES: Routes = [
    { path: '', component: LandingComponent },
    {
        path: 'admin-companies/:idStore',
        component: AdminCompaniesComponent,
        children: COMPANIES_ROUTES,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: ADMIN_ROUTES,
        canActivate: [ AuthGuard ]
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-in', component: SigninComponent },
    { path: 'companies/:idCompany', component: CompaniesComponent },
    { path: 'companies/:idCompany/pages/:pageId', component: CompaniesComponent },
    { path: 'landingpage', component: LandingComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'not-found' },
];

// export const appRouting = RouterModule.forRoot(app_routes);