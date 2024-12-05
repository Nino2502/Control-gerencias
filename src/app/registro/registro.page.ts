import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import axios from 'axios';
import { ToastController } from '@ionic/angular';  // Importa el ToastController

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
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



  private apiurl : string = 'http://localhost/quicky_coffee/proyecto_escuela/Empleados/agregar_empleado';

  constructor(private navCtrl: NavController, private toastController: ToastController) {}

  
  ngOnInit() {

    this.fetchDepartamentos();
    this.fetchPositions();

  
  
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
        const response = await axios.post(this.apiurl, {
          first_name: this.name,
          last_name: this.apellido,

          email: this.email,
          password: this.password,
          phone: this.telefono,
          department_id: this.selectedDepartamento,
          position_id: this.selectedPosition
        });

        if (response.data.status) {
          console.log('Inicio de sesión exitoso:', response.data.message);
           // Muestra un Toast de éxito
           await this.showToast('¡Inicio de sesión exitoso!', 'success');

          this.navCtrl.navigateForward('/inicio');


        } else {
          console.log('Error:', response.data.message);
         
                  // Muestra un Toast de error si ocurre un problema con la conexión
        await this.showToast('Error al conectar con el servidor', 'danger');
        }
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

    async fetchDepartamentos() {
      try {
        const response = await axios.get('http://localhost/quicky_coffee/proyecto_escuela/Empleados/departamentos');
        this.departamentos = response.data;
        console.log('Departamentos:', this.departamentos);
      } catch (error) {
        console.error('Error en fetchDepartamentos:', error);
      }
    }
  
    async fetchPositions() {
      try {
        const response = await axios.get('http://localhost/quicky_coffee/proyecto_escuela/Empleados/positions');
        this.positions = response.data;
        console.log('Positions:', this.positions);
      } catch (error) {
        console.error('Error en fetchPositions:', error);
      }
    }




  }

