import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController) {}

  
  ngOnInit() {
  }

  entrar_inicio(){
    console.log("Soy Correo ," , this.email);
    console.log("Constraseña ," , this.password);


    if(this.email && this.password){
      this.navCtrl.navigateForward('/home');
    } else{

      console.log("Error al enviar formulario");
      
    }

  }



}
