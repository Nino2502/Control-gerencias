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

  // Datos estáticos como respaldo
  fallbackData = [
    {
      employee_name: 'Juan Pérez',
      position_name: 'Gerente de Ventas',
      department_name: 'Ventas',
      start_date: '2020-01-15',
      end_date: null,
      status: '1',
    },
    {
      employee_name: 'Ana Gómez',
      position_name: 'Analista de Marketing',
      department_name: 'Marketing',
      start_date: '2019-06-01',
      end_date: null,
      status: '1',
    },
    {
      employee_name: 'Carlos Díaz',
      position_name: 'Desarrollador Backend',
      department_name: 'IT',
      start_date: '2021-03-20',
      end_date: '2023-05-01',
      status: '0',
    },
  ];

  constructor() { }

  ngOnInit() {
    this.get_estructura();
  }

  async get_estructura() {
    try {
      const response = await axios.get('http://localhost/quicky_coffee/proyecto_escuela/Estructura/estructura_info');
      this.data_estructura = response.data;

      if (!this.data_estructura || this.data_estructura.length === 0) {
        // Si no hay datos en la respuesta, usa los datos de respaldo
        this.data_estructura = this.fallbackData;
      }

      console.log("Datos obtenidos: ", this.data_estructura);

    } catch (error) {
      this.errorMessage = 'Error fetching data, showing fallback data';
      console.log(error);
      // En caso de error, usa los datos de respaldo
      this.data_estructura = this.fallbackData;
    }
  }

}
