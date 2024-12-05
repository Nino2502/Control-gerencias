import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../home/weather.service'; // Asegúrate de importar el servicio correctamente
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  city: string = 'mexico'; // Ciudad por defecto
  weatherData: any;

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; // Coordenadas iniciales
  zoom = 12; // Nivel de zoom
  markerOptions: google.maps.MarkerOptions = { draggable: false }; // Configuración del marcador
  markerPosition: google.maps.LatLngLiteral | null = null; // Posición del marcador
  latitude: number | null = null;
  longitude: number | null = null;

  constructor(private weatherService: WeatherService) {}

  async ngOnInit() {
    await this.getCurrentPosition(); // Obtener ubicación actual
    this.getWeatherData(); // Obtener datos del clima después de la ubicación
  }

  async getWeatherData() {
    try {
      this.weatherData = await this.weatherService.getWeather(this.city);
      console.log('Weather Data:', this.weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  async getCurrentPosition() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      // Configurar el centro del mapa y el marcador
      this.center = { lat: this.latitude, lng: this.longitude };
      this.markerPosition = this.center;

      console.log('Ubicación actual:', this.center);
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }
}
