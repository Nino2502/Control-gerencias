import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private navCtrl: NavController) {}


  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  setAuthToken(userId: string) {
    const token = `TOKEN-${userId}`;
    localStorage.setItem('authToken', token);
    return token;
  }


  logout() {
    localStorage.removeItem('authToken');
    this.navCtrl.navigateRoot('/inicio');
  }
}
