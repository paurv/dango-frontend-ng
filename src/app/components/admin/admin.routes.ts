import { Routes } from '@angular/router';

import { EmpresasComponent } from './empresas/empresas.component';
import { PlanesComponent } from './planes/planes.component';
import { TemasComponent } from './temas/temas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


export const ADMIN_ROUTES: Routes = [
    { path: 'empresas', component: EmpresasComponent },
    { path: 'planes', component: PlanesComponent },
    { path: 'temas', component: TemasComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'empresas' }
];
