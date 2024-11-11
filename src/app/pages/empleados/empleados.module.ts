import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmpleadosPageRoutingModule } from './empleados-routing.module';
import { EmpleadosPage } from './empleados.page';
import { CameraComponent } from '../../components/camera/camera.component'; // Ajusta la ruta si es necesario

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadosPageRoutingModule
  ],
  declarations: [EmpleadosPage, CameraComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmpleadosPageModule {}

