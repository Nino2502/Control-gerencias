import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
   path: 'home',
   loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
   path: 'activity',
   loadChildren: () => import('./pages/activity/activity.module').then(m => m.ActivityPageModule)
  },
  {
   path: 'settings',
   loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
 
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('./pages/empleados/empleados.module').then( m => m.EmpleadosPageModule)
  },
  {
    path: 'gerencias',
    loadChildren: () => import('./pages/gerencias/gerencias.module').then( m => m.GerenciasPageModule)
  },
  {
    path: 'estructura-organizacional',
    loadChildren: () => import('./pages/estructura-organizacional/estructura-organizacional.module').then( m => m.EstructuraOrganizacionalPageModule)
  },  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
