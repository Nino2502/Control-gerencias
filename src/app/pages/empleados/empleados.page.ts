import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  empleados = [
    { nombre: 'Juan Pérez', cargo: 'Desarrollador', departamento: 'Tecnología' },
    { nombre: 'Ana Gómez', cargo: 'Gerente de Proyectos', departamento: 'Administración' },
    { nombre: 'Carlos Ruiz', cargo: 'Diseñador', departamento: 'Marketing' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
