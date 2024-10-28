import { Component, OnInit } from '@angular/core';
import { string } from 'mathjs';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {



  activities_usuario: { name: string; duration: number; date: string }[] = [];

  nueva_actividad = {name : '', duration : 0, date: ''};




  constructor() { }

  addActivity(){


    if(this.nueva_actividad.name && this.nueva_actividad.duration && this.nueva_actividad.date){

      this.activities_usuario.push({
        name: this.nueva_actividad.name,
        duration: this.nueva_actividad.duration,
        date: this.nueva_actividad.date,
      });

      console.log("Soy la nueva actividad registrada", this.activities_usuario);

      this.nueva_actividad = { name: '', duration: 0, date: ''};


    }
    

  }

  ngOnInit() {


   

    console.log("Soy las actvidades del usario");



  }

}
