import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import axios from 'axios';

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

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.fetchdata_empleados();
    this.fetchPositions();
    this.fetchDepartamentos();
  }

  async opciones_newUser() {
    try {
      const departamentos_opciones = await axios.get(
        'http://localhost/quicky_coffee/proyecto_escuela/Departamentos/get_departamentos'
      );
    } catch (error) {
      console.error('Error en opciones_newUser:', error);
    }
  }

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
          handler: async (data) => {
            const updatedData = {
              employee_id: empleado.employee_id,
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              phone: data.phone,
              department_name: data.department_name,
              position_name: data.position_name,
            };

            try {
              const response = await axios.put(
                'http://localhost/quicky_coffee/proyecto_escuela/Empleados/editar_empleado',
                updatedData,
                { headers: { 'Content-Type': 'application/json' } }
              );

              if (response.data.status === 'success') {
                await this.showAlert('Éxito', 'Empleado se editó correctamente.', true);
              } else {
                await this.showAlert('Error', 'No se pudo editar el usuario.', false);
              }
            } catch (error) {
              console.error('Error al actualizar el empleado:', error);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async agregarEmpleado() {
    const alert = await this.alertController.create({
      header: 'Agregar nuevo empleado',
      inputs: [
        { name: 'first_name', type: 'text', placeholder: 'Nombre', value: '' },
        { name: 'last_name', type: 'text', placeholder: 'Apellidos', value: '' },
        { name: 'email', type: 'email', placeholder: 'Email', value: '' },
        { name: 'phone', type: 'tel', placeholder: 'Teléfono', value: '' },
        // Separador para Departamentos
        { name: 'separator', type: 'text', value: '--- Departamentos ---', disabled: true },
        // Opciones de Departamentos
        ...this.departamentos.map((dep) => ({
          name: 'department_id',
          type: 'radio' as const,
          label: dep.name,
          value: dep.department_id,
        })),
        // Separador para Posiciones
        { name: 'separator', type: 'text', value: '--- Posiciones ---', disabled: true },
        // Opciones de Posiciones
        ...this.positions.map((pos) => ({
          name: 'position_id',
          type: 'radio' as const,
          label: pos.name,
          value: pos.position_id,
        })),
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data) => {
            const newData = {
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              phone: data.phone,
              department_id: data.department_id,
              position_id: data.position_id,
            };
  
            try {
              const response = await axios.post(
                'http://localhost/quicky_coffee/proyecto_escuela/Empleados/agregar_empleado',
                newData,
                { headers: { 'Content-Type': 'application/json' } }
              );
  
              if (response.data.status === 'success') {
                await this.showAlert('Éxito', 'Empleado guardado correctamente.', true);
              } else {
                await this.showAlert('Error', 'No se pudo guardar el empleado.', false);
              }
            } catch (error) {
              console.error('Error al guardar empleado:', error);
              await this.showAlert('Error', 'Hubo un problema con la base de datos.', false);
            }
          },
        },
      ],
    });
    await alert.present();
  }
  
  async fetchDepartamentos() {
    try {
      const response = await axios.get('http://localhost/quicky_coffee/proyecto_escuela/Empleados/departamentos');
      this.departamentos = response.data;
      console.log('Departamentos:', this.departamentos);
    } catch (error) {
      console.error('Error en fetchDepartamentos:', error);
    }
  }

  async fetchPositions() {
    try {
      const response = await axios.get('http://localhost/quicky_coffee/proyecto_escuela/Empleados/positions');
      this.positions = response.data;
      console.log('Positions:', this.positions);
    } catch (error) {
      console.error('Error en fetchPositions:', error);
    }
  }

  async fetchdata_empleados() {
    try {
      const response = await axios.get('http://localhost/quicky_coffee/proyecto_escuela/Empleados/get_empleados');
      this.data_empleados = response.data;
      console.log('Empleados:', this.data_empleados);
    } catch (error) {
      this.errorMessage = 'Error fetching data';
      console.error(error);
    }
  }

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

  async changeStatus(id: number, estatus: number) {
    const alert = await this.alertController.create({
      header: 'Cambiar estatus del empleado',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Aceptar',
          handler: async () => {
            try {
              const response = await axios.post(
                'http://localhost/quicky_coffee/proyecto_escuela/Empleados/changeStatus',
                { employee_id: id, status: estatus },
                { headers: { 'Content-Type': 'application/json' } }
              );

              if (response.data.status === 'success') {
                await this.showAlert('Éxito', 'Estatus cambiado correctamente.', true);
              } else {
                await this.showAlert('Error', 'No se pudo cambiar el estatus.', false);
              }
            } catch (error) {
              console.error('Error al cambiar estatus:', error);
              await this.showAlert('Error', 'Hubo un problema con la base de datos.', false);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async eliminarEmpleado(id: number) {
    const alert = await this.alertController.create({
      header: 'Seguro que quieres borrar el usuario?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Aceptar',
          handler: async () => {
            try {
              const response = await axios.post(
                'http://localhost/quicky_coffee/proyecto_escuela/Empleados/eliminar_empleado',
                { employee_id: id },
                { headers: { 'Content-Type': 'application/json' } }
              );

              if (response.data.status === 'success') {
                await this.showAlert('Éxito', 'Empleado eliminado correctamente.', true);
              } else {
                await this.showAlert('Error', 'No se pudo eliminar el empleado.', false);
              }
            } catch (error) {
              console.error('Error al eliminar empleado:', error);
              await this.showAlert('Error', 'Hubo un problema con la base de datos.', false);
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
