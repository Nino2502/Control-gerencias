import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';  // Importa Router para redirigir
import { ToastController } from '@ionic/angular';  // Importa el ToastController

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private navCtrl: NavController,
    private router: Router,  // Inyecta Router para redirección
    private toastController: ToastController
  ) {}


  async cerrarSesion() {
    // Muestra un Toast antes de cerrar la sesión
    await this.showToast('¡Cerrando sesión...', 'success');

    this.router.navigate(['/inicio']);


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


}
