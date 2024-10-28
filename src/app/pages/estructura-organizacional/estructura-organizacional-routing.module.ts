import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstructuraOrganizacionalPage } from './estructura-organizacional.page';

const routes: Routes = [
  {
    path: '',
    component: EstructuraOrganizacionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstructuraOrganizacionalPageRoutingModule {}
