import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GerenciasPageRoutingModule } from './gerencias-routing.module';

import { GerenciasPage } from './gerencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GerenciasPageRoutingModule
  ],
  declarations: [GerenciasPage]
})
export class GerenciasPageModule {}
