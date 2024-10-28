import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerenciasPage } from './gerencias.page';

const routes: Routes = [
  {
    path: '',
    component: GerenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerenciasPageRoutingModule {}
