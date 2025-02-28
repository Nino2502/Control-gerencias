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
 

    try {


      this.firestoreService.getCollection<any>('departamentos').subscribe(async data => {
        this.data_gerencias = data;
        console.log('Datos del departamento:', this.data_gerencias);
      });



    } catch (error) {
      this.data_gerencias = [];

    }

  }



  async editarGerencias(gerencias: any){

    console.log("Soy gerencia editar . . ", gerencias);

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
