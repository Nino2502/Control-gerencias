import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../home/weather.service'; // Servicio del clima
import { Geolocation } from '@capacitor/geolocation'; // Geolocalización
import { NewsService } from './news.service'; // Servicio de noticias

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // Datos del clima
  city: string = 'mexico'; // Ciudad por defecto
  weatherData: any;

  // Configuración del mapa
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; // Coordenadas iniciales
  zoom: number = 12; // Nivel de zoom
  markerOptions: google.maps.MarkerOptions = { draggable: false }; // Configuración del marcador
  markerPosition: google.maps.LatLngLiteral | null = null; // Posición del marcador
  latitude: number | null = null;
  longitude: number | null = null;

  // Datos de noticias
  articles: any[] = []; // Lista de artículos
  currentPage: number = 1; // Página actual para paginación
  pageSize: number = 10; // Número de artículos por página
  isLoading: boolean = false; // Indicador de carga

  constructor(
    private weatherService: WeatherService, // Servicio del clima
    private newsService: NewsService // Servicio de noticias
  ) {}

  // Inicialización del componente
  async ngOnInit() {
    await this.getCurrentPosition(); // Obtener ubicación actual
    this.getWeatherData(); // Obtener datos del clima basados en la ciudad
    this.loadNews(); // Cargar noticias
  }

  // Método: Obtener datos del clima
  async getWeatherData() {
    try {
      this.weatherData = await this.weatherService.getWeather(this.city);
      console.log('Weather Data:', this.weatherData); // Log de datos del clima
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  // Método: Obtener la posición actual
  async getCurrentPosition() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      // Configurar el centro del mapa y la posición del marcador
      this.center = { lat: this.latitude, lng: this.longitude };
      this.markerPosition = this.center;

      console.log('Ubicación actual:', this.center); // Log de ubicación actual
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }

  // Método: Cargar noticias con scroll infinito
  async loadNews(event?: any) {
    if (this.isLoading) return; // Evita solicitudes múltiples simultáneas
    this.isLoading = true;

    try {
      const response = await this.newsService.getNewsInSpanish(this.currentPage, this.pageSize);
      this.articles.push(...response.articles); // Agregar noticias al arreglo existente

      // Finaliza el evento de scroll infinito
      if (event) {
        event.target.complete();
      }

      // Si no hay más noticias, deshabilita el scroll infinito
      if (response.articles.length < this.pageSize && event) {
        event.target.disabled = true;
      }
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      this.isLoading = false; // Restablece el indicador de carga
      this.currentPage++; // Incrementa la página para la próxima carga
    }
  }
}
