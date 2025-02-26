import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import axios from 'axios';
import { ToastController } from '@ionic/angular';  // Importa el ToastController

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 

import { CanActivate, Router } from '@angular/router';




import { FirestoreService } from '../services/firestore.service';


import * as bcrypt from 'bcryptjs';


import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';


@Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
    imports: [CommonModule, IonicModule, FormsModule]
})
export class RegistroPage implements OnInit {


  name: string = '';
  apellido : string = '';

  email: string = '';
  password: string = '';
  telefono: string = '';

  selectedDepartamento: any; // Aquí se guardará el id del departamento seleccionado
  selectedPosition: any; // Aquí se guardará el id del cargo seleccionado

  departamentos: any[] = [];
  positions: any[] = [];

  usuarios: any[] = [];




  constructor(private navCtrl: NavController, private router: Router, private toastController: ToastController, private firestoreService: FirestoreService,private auth: Auth) {}

  
  async ngOnInit() {

    this.firestoreService.getCollection<any>('departamentos').subscribe(async data => {
      this.departamentos = data;
      console.log('Datos del departamento:', this.departamentos);
    });


    this.firestoreService.getCollection<any>('Position').subscribe(async data => {
      this.positions = data;
      console.log('POSITION . . . .:', this.positions);
    });

  }

  async registrar_usuario(){


    console.log("Soy Nombre. . .", this.name);

    console.log("Soy Apellido . .", this.apellido);

    console.log("Soy CORREO . . ", this.email);

    console.log("Soy PASSWORD . .", this.password);

    console.log("Soy telefono . .", this.telefono);

  // Imprime los valores seleccionados
  console.log("Soy la opción de Departamento (id): ", this.selectedDepartamento);
  console.log("Soy la opción de Cargo (id): ", this.selectedPosition);
    


    if (this.email && this.password && this.name && this.apellido && this.telefono && this.selectedDepartamento && this.selectedPosition) {
      try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
        const userId = userCredential.user.uid;


        const nuevo_usuario = {

          id: userId,
          email: this.email,
          name: this.name,
          apellido: this.apellido,
          telefono: this.telefono,
          department_id: this.selectedDepartamento,
          position_id: this.selectedPosition
        }
        this.usuarios.push(nuevo_usuario);


        console.log("Imprimeme nuevos usuaruis . . ", this.usuarios);


    
         

        this.firestoreService.addDocument('users', nuevo_usuario);



        

        
        // Mostrar mensaje de éxito
        this.showToast('Usuario registrado exitosamente en la base de datos!', 'success');


        this.router.navigate(['/inicio']);
       

      } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error al conectar con el servidor');
      }
    } else {
      console.log('Error: Campos vacíos');
      alert('Por favor completa todos los campos');
    }
  }

    // Método para mostrar un Toast
    async showToast(message: string, color: string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,  // Duración del Toast en milisegundos
        color: color,    // Puedes usar 'success', 'danger', 'warning', etc.
        position: 'top'  // Puedes cambiar la posición si es necesario
      });
      toast.present();
    }


    goToHome() {
      this.navCtrl.navigateForward(['/home']);
    }

    registro_usuario(){

      this.navCtrl.navigateForward(['/registro']);
      
    }






  }

