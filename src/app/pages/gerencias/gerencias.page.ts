import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import * as bcrypt from 'bcryptjs';


import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';


import { FirestoreService } from '.././../services/firestore.service';



@Component({
    selector: 'app-gerencias',
    templateUrl: './gerencias.page.html',
    styleUrls: ['./gerencias.page.scss'],
    standalone: false
})
export class GerenciasPage implements OnInit {

  data_gerencias: any[] = [];
  newItem: string = '';
  errorMessage : string = '';


  constructor(private alertController: AlertController,private firestoreService: FirestoreService ) { }

  ngOnInit() {
 
    this.get_depar();
    
    /*
    try {


      this.firestoreService.getCollection<any>('departamentos').subscribe(async data => {
        this.data_gerencias = data;
        console.log('Datos del departamento:', this.data_gerencias);
      });



    } catch (error) {
      this.data_gerencias = [];

    }
    */
  }

  async get_depar(){
    interface Depa {
      nombre: string;
      descripcion: string;
    }

    try {
      const response = await axios.get<{ departamentos: Depa[] }>(
        'https://app-api-basica-188817112506.us-central1.run.app/departamentos'
      );
      this.data_gerencias = response.data.departamentos;
      console.log('Los departamentos obtenidos:', this.data_gerencias);


    } catch (error: any) {
      console.error('Error al obtener los roles:', error.message);
      console.error('Código de error:', error.code);
      console.error('Detalles de la solicitud:', error.config);
    }

  }



  async editarGerencias(gerencias: any){

    console.log("Soy gerencia editar . . ", gerencias);




  }

  async agregar_departamento() {
    const alert = await this.alertController.create({
      header: 'Agregar nuevo departamento',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre del Departamento', value: '' },
        { name: 'descripcion', type: 'text', placeholder: 'Descripción del Departamento', value: '' },
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
                'https://app-api-basica-188817112506.us-central1.run.app/departamentos',
                newData,
                { headers: { 'Content-Type': 'application/json' } }
              );
              console.log('Departamento agregado:', response.data);
              this.showAlert("Departamento agregado correctamente", "success");

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

    // Función para mostrar alertas
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

  async eliminarGerencias(id: number){

    console.log("Soy el de id gerencias . . ", id);


  }
  async addItem(){
    if(!this.newItem) return;

    const alert = await this.alertController.create({

    });

    await alert.present();
    


  }


}
