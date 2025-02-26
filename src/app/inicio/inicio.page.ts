import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Auth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { Firestore, collection, getDocs, query, where, DocumentData } from '@angular/fire/firestore';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.page.html',
    styleUrls: ['./inicio.page.scss'],
    standalone: false
})
export class InicioPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  ngOnInit() {}

  async entrar_inicio() {
    console.log("Soy CORREO . . ", this.email);
    console.log("Soy PASSWORD . .", this.password);

    if (this.email && this.password) {
      try {

        console.log("Entre en TRYYYY");

        const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
        const userId = userCredential.user.uid;

        const usersCollection = collection(this.firestore, 'users');
        const id_validacion = query(usersCollection, where('id', '==', userId));
        const consulta = await getDocs(id_validacion);



        console.log("Soy usersCollection . .", usersCollection);
        console.log("Soy consulaaaaaaaaa..", consulta);




        


        if (!consulta.empty) {
          const userData: DocumentData = consulta.docs[0].data();
          console.log("Soy USERDATA de un USUARIOOOO. . ", userData);


          
    
          localStorage.setItem('userData', JSON.stringify(userData));

          await this.showToast('¡Inicio de sesión exitoso!', 'success');
          this.navCtrl.navigateForward('/home');
        } else {
          await this.showToast('Usuario no encontrado en la base de datos', 'danger');
        }
      } catch (error) {
        console.error('Error en el login:', error);
        await this.showToast('Error en el inicio de sesión', 'danger');
      }
    } else {
      console.log('Error: Campos vacíos');
      await this.showToast('Por favor completa todos los campos', 'warning');
    }
  }

  async getPermissions(role: string): Promise<string[]> {
    const rolesCollection = collection(this.firestore, 'roles');
    const q = query(rolesCollection, where('role', '==', role));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const roleData = querySnapshot.docs[0].data();
      return roleData['permissions'] || [];
    }
    return [];
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  goToHome() {
    this.navCtrl.navigateForward(['/home']);
  }

  registro_usuario() {
    this.navCtrl.navigateForward(['/registro']);
  }
}
