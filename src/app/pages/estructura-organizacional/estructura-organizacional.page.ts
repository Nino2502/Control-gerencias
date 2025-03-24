import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
    selector: 'app-estructura-organizacional',
    templateUrl: './estructura-organizacional.page.html',
    styleUrls: ['./estructura-organizacional.page.scss'],
    standalone: false
})
export class EstructuraOrganizacionalPage implements OnInit {

  data_estructura: any[] = [];
  errorMessage: string = '';

  

  constructor() { }

  ngOnInit() {
    this.get_estructura();
  }

  async get_estructura() {
    try {
      const response = await axios.get('https://app-api-basica-188817112506.us-central1.run.app/roles');

      this.data_estructura = response.data.roles;




      console.log("Datos obtenidos: ", this.data_estructura);

    } catch (error) {
      this.errorMessage = 'Error fetching data, showing fallback data';
      console.log(error);
  
    }
  }

  async agregar_rol(){

    console.log("Soy agregar rol chidote pa´ apoco no?");
    
  }

}
