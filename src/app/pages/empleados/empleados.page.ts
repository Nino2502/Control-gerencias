import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


import axios from 'axios';
import qs from 'qs';
import { CameraComponent } from '../../components/camera/camera.component';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  data_empleados: any[] = [];
  newItem: string = '';
  errorMessage: string = '';


  constructor(private alertController: AlertController) {}

  ngOnInit() {

    this.fetchdata_empleados()
  }

  async opciones_newUser(){
    try{

      const departamentos_opciones = await axios.get('http://localhost/quicky_coffee/proyecto_escuela/Departamentos/get_departamentos');


    } catch(error){

      
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
        { name: 'position_name', type: 'text', placeholder: 'Posición', value: empleado.position_name }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data) => {
            const updatedData = {
              employee_id: empleado.employee_id,  // Asegúrate de incluir el ID del empleado
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              phone: data.phone,
              department_name: data.department_name,
              position_name: data.position_name
            };

            try{

              const response = await axios.put(
                'http://localhost/quicky_coffee/proyecto_escuela/Empleados/editar_empleado',
                updatedData,
                { headers: { 'Content-Type': 'application/json' } }
               );

               if(response.data.status == 'success'){

                console.log("El empleado se actualizo correctamente");
                await this.showAlert('Éxito', 'Empleado se edito correctamente.', true);

               }else{


                console.log("Error a editar el usuario");

                await this.showAlert('Error', 'No se pudo editar el usuario.', true);


               }




            }catch(error){

              console.error('Error al actualizar el empleado:', error);


            }
            
  
           
          }
        }
      ]
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
            { name: 'department_id', type: 'text', placeholder: 'Departamento', value: '' },
            { name: 'position_id', type: 'text', placeholder: 'Posición', value: '' },
        ],
        buttons: [
            { text: 'Cancelar', role: 'cancel' },
            {
                text: 'Guardar',
                handler: async (data) => {  // Cambiamos a función async
                    const newData = {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        phone: data.phone,
                        department_id: data.department_id,
                        position_id: data.position_id
                    };

                    try {
                        const response = await axios.post(
                            'http://localhost/quicky_coffee/proyecto_escuela/Empleados/agregar_empleado',
                            newData,
                            { headers: { 'Content-Type': 'application/json' } }
                        );

                        if (response.data.status === "success") {
                            console.log("Se insertó el usuario correctamente");
                            await this.showAlert('Éxito', 'Empleado guardado correctamente.', true);
                           

                        } else {
                            console.error('Error al guardar el empleado:', response.data.message);
                            await this.showAlert('Error', 'No se pudo guardar el empleado: ' , false);
                        }
                    } catch (error) {
                        console.error("Error de base de datos", error);
                        await this.showAlert('Error', 'Hubo un problema con la base de datos.', false);
                    }
                }
            }
        ],
    });
    await alert.present();
}

  async fetchdata_empleados(){

    try{
      const response = await axios.get('http://localhost/quicky_coffee/proyecto_escuela/Empleados/get_empleados');

      this.data_empleados = response.data;

      console.log("Soy empleados . ", this.data_empleados);

      
    }catch(error){
      this.errorMessage = 'Error fetching data';
      console.log(error);


    }



  }

  // Método para mostrar alertas
  async showAlert(header: string, message: string, reload: boolean = false) {
    const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: [{
            text: 'OK',
            handler: () => {
                if (reload) {
                    location.reload();
                }
            }
        }]
    });
    await alert.present();
}


  async changeStatus(id: number, estatus: number){

    const id_epleado = id;
    console.log("Soy id empleado . .", id_epleado);
    const status_nuevo = estatus;

    console.log("Soi el estatus .. ", status_nuevo);


    const alert = await this.alertController.create({
      header: 'Cambiar estatus del empleado',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: async () => {
            try {
              const response = await axios.post(
                'http://localhost/quicky_coffee/proyecto_escuela/Empleados/changeStatus',
                { employee_id: id_epleado, status: status_nuevo },
                { headers: { 'Content-Type': 'application/json' } }
              );

              console.log("Soy Response. . ", response);
              

  
              if (response.data.status === "success") {
                console.log("Empleado eliminado correctamente");
                await this.showAlert('Éxito', 'El estatus se cambio correctamente', true);
              } else {
                console.error('Error al cambiar estatus', response.data.message);
                await this.showAlert('Error', response.data.message, false);
              }
  
            } catch (error) {
              console.error("Error de base de datos", error);
              await this.showAlert('Error', 'Hubo un problema con la base de datos.', false);
            }
          }
        }
      ]
    });

    await alert.present();






  }

  async eliminarEmpleado(id: number) {
    console.log("Soy borrar usuario . . .", id);
  
    const id_empleado = id;
  
    const alert = await this.alertController.create({
      header: 'Seguro que quieres borrar el usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: async () => {
            try {
              const response = await axios.post(
                'http://localhost/quicky_coffee/proyecto_escuela/Empleados/eliminar_empleado',
                { employee_id: id_empleado }, // Aquí pasas el ID del empleado como parte del objeto
                { headers: { 'Content-Type': 'application/json' } }
              );
  
              if (response.data.status === "success") {
                console.log("Empleado eliminado correctamente");
                await this.showAlert('Éxito', 'Empleado eliminado correctamente.', true);
              } else {
                console.error('Error al eliminar el empleado:', response.data.message);
                await this.showAlert('Error', response.data.message, false);
              }
  
            } catch (error) {
              console.error("Error de base de datos", error);
              await this.showAlert('Error', 'Hubo un problema con la base de datos.', false);
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  
}
