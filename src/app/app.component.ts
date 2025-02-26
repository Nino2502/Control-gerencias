import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importa Router para redirección
import { ToastController } from '@ionic/angular'; // Importa ToastController para mensajes
import { FcmService } from './services/fcm.service'; // Servicio para notificaciones push

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  constructor(
    private navCtrl: NavController,
    private router: Router, // Inyección de Router
    private toastController: ToastController, // Inyección de ToastController
    private fcmService: FcmService // Servicio de notificaciones push
  ) {}

  /**
   * Método que se ejecuta al iniciar la aplicación.
   * Inicializa las notificaciones push.
   */
  ngOnInit() {
    this.fcmService.initPush();
  }

  /**
   * Método para cerrar sesión.
   * Muestra un mensaje de confirmación y redirige a la página de inicio.
   */
  async cerrarSesion() {
    // Muestra un Toast informando del cierre de sesión
    await this.showToast('¡Cerrando sesión...', 'success');

    // Redirige al usuario a la página de inicio
    this.router.navigate(['/inicio']);
  }

  /**
   * Método para mostrar un Toast.
   * @param message Mensaje a mostrar en el Toast
   * @param color Color del Toast ('success', 'danger', 'warning', etc.)
   */
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración del Toast en milisegundos
      color: color, // Color del Toast
      position: 'top', // Posición del Toast
    });

    // Muestra el Toast
    await toast.present();
  }
}
