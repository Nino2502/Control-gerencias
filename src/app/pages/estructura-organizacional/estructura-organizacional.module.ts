import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstructuraOrganizacionalPageRoutingModule } from './estructura-organizacional-routing.module';

import { EstructuraOrganizacionalPage } from './estructura-organizacional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstructuraOrganizacionalPageRoutingModule
  ],
  declarations: [EstructuraOrganizacionalPage]
})
export class EstructuraOrganizacionalPageModule {}
