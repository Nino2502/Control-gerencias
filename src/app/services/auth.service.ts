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

  setAuthToken(token: string) {
    localStorage.setItem('authToken', token);
  }


  logout() {
    localStorage.removeItem('authToken');
    this.navCtrl.navigateRoot('/inicio');
  }
}
