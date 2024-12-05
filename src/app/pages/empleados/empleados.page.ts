import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {
  data_empleados: any[] = [];
  newItem: string = '';
  errorMessage: string = '';
  departamentos: any[] = [];
  positions: any[] = [];
  capturedImage: string | undefined;

  // Datos estáticos para respaldo
  staticData = [
    {
      employee_id: 1,
      first_name: 'Juan',
      last_name: 'Pérez',
      email: 'juan.perez@example.com',
      phone: '123456789',
      department_name: 'Ventas',
      position_name: 'Gerente de Ventas',
      status: 1,
      capturedImage: undefined,
    },
    {
      employee_id: 2,
      first_name: 'Ana',
      last_name: 'Gómez',
      email: 'ana.gomez@example.com',
      phone: '987654321',
      department_name: 'Marketing',
      position_name: 'Analista de Marketing',
      status: 0,
      capturedImage: undefined,
    },
  ];

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.fetchdata_empleados();
    this.fetchPositions();
    this.fetchDepartamentos();
  }

  // Función para manejar la cámara
  async takePicture(employeeId: number) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      const empleado = this.data_empleados.find(emp => emp.employee_id === employeeId);
      if (empleado) {
        empleado.capturedImage = image.dataUrl; // Asigna la imagen capturada al empleado
      }
    } catch (error) {
      console.error('Error al capturar imagen:', error);
    }
  }

  // Función para editar empleado
  async editarEmpleado(empleado: any) {
    const alert = await this.alertController.create({
      header: 'Editar Empleado',
      inputs: [
        { name: 'employee_id', type: 'text', placeholder: 'ID', value: empleado.employee_id, disabled: true },
        { name: 'first_name', type: 'text', placeholder: 'Nombre', value: empleado.first_name },
        { name: 'last_name', type: 'text', placeholder: 'Apellidos', value: empleado.last_name },
        { name: 'email', type: 'email', placeholder: 'Email', value: empleado.email },
        { name: 'phone', type: 'tel', placeholder: 'Teléfono', value: empleado.phone },
        { name: 'department_name', type: 'text', placeholder: 'Departamento', value: empleado.department_name },
        { name: 'position_name', type: 'text', placeholder: 'Posición', value: empleado.position_name },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const updatedData = {
              employee_id: empleado.employee_id,
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              phone: data.phone,
              department_name: data.department_name,
              position_name: data.position_name,
            };

            // Actualiza el empleado en los datos estáticos
            const index = this.data_empleados.findIndex(emp => emp.employee_id === empleado.employee_id);
            if (index !== -1) {
              this.data_empleados[index] = updatedData;
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Función para agregar nuevo empleado
  async agregarEmpleado() {
    const alert = await this.alertController.create({
      header: 'Agregar nuevo empleado',
      inputs: [
        { name: 'first_name', type: 'text', placeholder: 'Nombre', value: '' },
        { name: 'last_name', type: 'text', placeholder: 'Apellidos', value: '' },
        { name: 'email', type: 'email', placeholder: 'Email', value: '' },
        { name: 'phone', type: 'tel', placeholder: 'Teléfono', value: '' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const newData = {
              employee_id: this.data_empleados.length + 1, // Nuevo ID basado en el tamaño del array
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              phone: data.phone,
              department_name: 1, // Coloca un valor predeterminado
              position_name: 2, // Coloca un valor predeterminado
              status: 1,
              capturedImage: undefined,
            };
            this.data_empleados.push(newData);
          },
        },
      ],
    });
    await alert.present();
  }

  // Función para eliminar empleado
  async eliminarEmpleado(id: number) {
    const alert = await this.alertController.create({
      header: 'Seguro que quieres borrar el usuario?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Aceptar',
          handler: () => {
            this.data_empleados = this.data_empleados.filter(emp => emp.employee_id !== id);
          },
        },
      ],
    });
    await alert.present();
  }

  // Funciones para obtener departamentos y posiciones
  async fetchDepartamentos() {
    try {
      const response = await axios.get('http://localhost/quicky_coffee/proyecto_escuela/Empleados/departamentos');
      this.departamentos = response.data;
    } catch (error) {
      this.departamentos = [
        { department_id: 1, name: 'Ventas' },
        { department_id: 2, name: 'Marketing' },
      ];
    }
  }

  async fetchPositions() {
    try {
      const response = await axios.get('http://localhost/quicky_coffee/proyecto_escuela/Empleados/positions');
      this.positions = response.data;
    } catch (error) {
      this.positions = [
        { position_id: 1, name: 'Gerente' },
        { position_id: 2, name: 'Analista' },
      ];
    }
  }

  // Función para obtener los empleados
  async fetchdata_empleados() {
    try {
      const response = await axios.get('http://localhost/quicky_coffee/proyecto_escuela/Empleados/get_empleados');
      this.data_empleados = response.data;
    } catch (error) {
      this.data_empleados = this.staticData;
    }
  }

  // Función para mostrar alertas
  async showAlert(header: string, message: string, reload: boolean = false) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (reload) {
              location.reload();
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Función para cambiar el estatus del empleado
  async changeStatus(id: number, estatus: number) {
    const alert = await this.alertController.create({
      header: 'Cambiar estatus del empleado',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Aceptar',
          handler: () => {
            const empleado = this.data_empleados.find(emp => emp.employee_id === id);
            if (empleado) {
              empleado.status = estatus === 1 ? 0 : 1;
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
