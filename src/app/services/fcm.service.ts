import { Injectable } from '@angular/core';
import { FCM } from '@capacitor-community/fcm';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { AlertController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  constructor(private alertController: AlertController, private platform: Platform) {}

  async initPush() {
    if (this.platform.is('capacitor')) {
      // Solicitar permiso para recibir notificaciones
      await PushNotifications.requestPermissions().then((result) => {
        if (result.receive === 'granted') {
          PushNotifications.register();
        }
      });

      // Obtener el token de FCM
      PushNotifications.addListener('registration', (token: Token) => {
        console.log('Push registration success, token:', token.value);
      });

      PushNotifications.addListener('registrationError', (error: any) => {
        console.error('Error on registration:', error);
      });

      // Manejar notificaciones recibidas
      PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotificationSchema) => {
        const alert = await this.alertController.create({
          header: notification.title || 'Notificación',
          message: notification.body || 'Nueva notificación recibida',
          buttons: ['OK'],
        });
        await alert.present();
      });

      // Manejar interacción con notificaciones
      PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
        console.log('Push action performed:', notification);
      });

      // Suscribirse a un tema
      FCM.subscribeTo({ topic: 'general' }).then(() => {
        console.log('Subscribed to topic: general');
      });
    }
  }
}

