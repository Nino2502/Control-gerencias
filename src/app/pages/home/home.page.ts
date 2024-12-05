import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../home/weather.service';  // Asegúrate de importar el servicio correctamente
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  city: string = 'mexico';  // O cualquier ciudad por defecto
  weatherData: any;

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; // Coordenadas iniciales
  zoom = 12; // Nivel de zoom
  markerOptions: google.maps.MarkerOptions = { draggable: false }; // Configuración del marcador
  markerPosition: google.maps.LatLngLiteral | null = null; // Posición del marcador

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeatherData();
  }

  async getWeatherData() {
    try {
      this.weatherData = await this.weatherService.getWeather(this.city);
      console.log('Weather Data:', this.weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  async getCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.markerPosition = this.center; // Colocar el marcador en la ubicación actual
      console.log('Ubicación actual:', this.center);
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }
}
