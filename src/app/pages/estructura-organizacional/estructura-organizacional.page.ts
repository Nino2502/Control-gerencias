import { Component, OnInit } from '@angular/core';
import axios from 'axios';

import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-estructura-organizacional',
    templateUrl: './estructura-organizacional.page.html',
    styleUrls: ['./estructura-organizacional.page.scss'],
    standalone: false
})
export class EstructuraOrganizacionalPage implements OnInit {

  data_estructura: any[] = [];
  errorMessage: string = '';

  

  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.get_estructura();
  }

  async get_estructura() {
    try {
      const response = await axios.get('https://app-api-basica-188817112506.us-central1.run.app/roles');

      this.data_estructura = response.data.roles;




      console.log("Datos obtenidos: ", this.data_estructura);

    } catch (error) {
      this.errorMessage = 'Error fetching data, showing fallback data';
      console.log(error);
  
    }
  }


  async agregar_rol() {
    const alert = await this.alertController.create({
      header: 'Agregar nuevo departamento',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre del Rol', value: '' },
        { name: 'descripcion', type: 'text', placeholder: 'Descripción del nuevo Rol', value: '' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data) => {
            const newData = {
              nombre: data.nombre.trim(),
              descripcion: data.descripcion.trim(),
            };
  

            if (!newData.nombre || !newData.descripcion) {
           

              return;
            }
  
            try {
              const response = await axios.post(
                'https://app-api-basica-188817112506.us-central1.run.app/roles',
                newData,
                { headers: { 'Content-Type': 'application/json' } }
              );
              console.log('Departamento agregado:', response.data);
              this.showAlert("Rol agregado correctamente", "success");

              location.reload();
              
  
            } catch (error) {
              console.error('Error al agregar departamento:', error);

            }
          },
        },
      ],
    });
  
    await alert.present();
  }

  async showAlert(header: string, message: string, reload: boolean = false) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (reload) {
              location.reload();
            }
          },
        },
      ],
    });
    await alert.present();
  }

}
