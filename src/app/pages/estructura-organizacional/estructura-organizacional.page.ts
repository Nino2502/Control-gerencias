import { Component, OnInit } from '@angular/core';


import axios from 'axios';
import qs from 'qs';



@Component({
  selector: 'app-estructura-organizacional',
  templateUrl: './estructura-organizacional.page.html',
  styleUrls: ['./estructura-organizacional.page.scss'],
})
export class EstructuraOrganizacionalPage implements OnInit {

  data_estructura: any[] = [];
  errorMessage: string = '';



  constructor() { }

  ngOnInit() {

    this.get_estructura()

  }

  async get_estructura(){
    try{

      const response = await axios.get('http://localhost/quicky_coffee/proyecto_escuela/Estructura/estructura_info');

      this.data_estructura = response.data;

      console.log("Soy empleados . ", this.data_estructura);


    }catch(error){
      this.errorMessage = 'Error fetching data';
      console.log(error);

    }
  }

}
