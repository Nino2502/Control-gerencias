import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import axios from 'axios';
import { ToastController } from '@ionic/angular';  // Importa el ToastController

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  email: string = '';
  password: string = '';


  private apiurl : string = 'http://localhost/quicky_coffee/proyecto_escuela/Acceso/login';

  constructor(private navCtrl: NavController, private toastController: ToastController) {}

  
  ngOnInit() {
  }

  async entrar_inicio(){

    console.log("Soy CORREO . . ", this.email);

    console.log("Soy PASSWORD . .", this.password);
    if (this.email && this.password) {
      try {
        const response = await axios.post(this.apiurl, {
          email: this.email,
          password: this.password,
        });

        if (response.data.status) {
          console.log('Inicio de sesión exitoso:', response.data.message);
           // Muestra un Toast de éxito
           await this.showToast('¡Inicio de sesión exitoso!', 'success');

          this.navCtrl.navigateForward('/home');
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




  }

