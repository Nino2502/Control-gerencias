import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import axios from 'axios';


@Component({
  selector: 'app-gerencias',
  templateUrl: './gerencias.page.html',
  styleUrls: ['./gerencias.page.scss'],
})
export class GerenciasPage implements OnInit {

  data: any[] = [];
  newItem: string = '';
  errorMessage : string = '';


  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.fetchData();
  }

  async fetchData(){

    try{
      const response = await axios.get('http://localhost/quicky_coffee/gerencias/Gerencias/get_gerencias');

      this.data = response.data;

      console.log("Soy dato de gerencias . ", this.data);

      
    }catch(error){
      this.errorMessage = 'Error fetching data';
      console.log(error);


    }

  }

  async editarGerencias(gerencias: any){

    console.log("Soy gerencia editar . . ", gerencias);

  }

  async eliminarGerencias(id: number){

    console.log("Soy el de id gerencias . . ", id);


  }
  async addItem(){
    if(!this.newItem) return;

    const alert = await this.alertController.create({

    });

    await alert.present();
    


  }


}
