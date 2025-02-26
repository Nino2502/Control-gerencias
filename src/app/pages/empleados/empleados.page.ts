import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";



import { FirestoreService } from '.././../services/firestore.service';


@Component({
    selector: 'app-empleados',
    templateUrl: './empleados.page.html',
    styleUrls: ['./empleados.page.scss'],
    standalone: false
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

  constructor(private alertController: AlertController, private firestoreService: FirestoreService) {}

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

    console.log("Soy empleados . . para editar bb", empleado);

  
    const alert = await this.alertController.create({
      header: 'Editar Empleado',
      inputs: [
        { name: 'employee_id', type: 'text', placeholder: 'ID', value: empleado.id, disabled: true },
        { name: 'first_name', type: 'text', placeholder: 'Nombre', value: empleado.name },
        { name: 'last_name', type: 'text', placeholder: 'Apellidos', value: empleado.apellido },
        { name: 'email', type: 'email', placeholder: 'Email', value: empleado.email },
        { name: 'phone', type: 'tel', placeholder: 'Teléfono', value: empleado.telefono },
        { name: 'department_name', type: 'text', placeholder: 'Departamento', value: empleado.department_id },
        { name: 'position_name', type: 'text', placeholder: 'Posición', value: empleado.position_id },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data) => {

            try{

              const updatedData = {
                id: empleado.id,
                name: data.first_name.toUpperCase().trim().toLowerCase(),
                apellido: data.last_name.toUpperCase().trim().toLowerCase(),
                email: data.email,
                telefono: data.phone,
                department_id: data.department_name,
                position_id: data.position_name,
                status: 1
              };

              console.log("Soi los datos de los USUARIOS. .  .", updatedData);
              await this.firestoreService.updateDocument('users', empleado.id, updatedData);
   
              this.showAlert("Usuario se registro exitosamente!!", "success");

              return true;
            

            } catch(error){

              console.error("Error al registrar usuario:", error);
              this.showAlert("Error al registrar usuario", "danger");
              return false;


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
              employee_id: this.data_empleados.length + 1,
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              phone: data.phone,
              department_name: 1,
              position_name: 2,
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


      this.firestoreService.getCollection<any>('users').subscribe(async data => {
        this.data_empleados = data;
        console.log('Datos del departamento:', this.data_empleados);
      });



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
