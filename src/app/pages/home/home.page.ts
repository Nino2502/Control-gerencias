import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../home/weather.service';
import { Geolocation } from '@capacitor/geolocation'; 
import { NewsService } from './news.service'; 
import { LocalNotifications } from '@capacitor/local-notifications';
import axios from 'axios';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  videoId: string = 's-cXzJOwWBE';
  apiKey: string = environment.youtubeApiKey;
  city: string = 'mexico';
  weatherData: any;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom: number = 12;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition: google.maps.LatLngLiteral | null = null;
  latitude: number | null = null;
  longitude: number | null = null;
  articles: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  isLoading: boolean = false;

  videoDetails: any;

  constructor(
    private weatherService: WeatherService,
    private newsService: NewsService
  ) {}

  async ngOnInit() {
    await this.getCurrentPosition(); // Obtener ubicación actual
    this.getWeatherData(); // Obtener datos del clima
    this.loadNews(); // Cargar noticias
  }

  async getWeatherData() {
    try {
      this.weatherData = await this.weatherService.getWeather(this.city);
      console.log('Weather Data:', this.weatherData);

      await this.sendNotification(
        'Clima cargado',
        `El clima de ${this.city} es: ${this.weatherData.weather[0].description}`
      );
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  async fetchVideoDetails() {
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${this.videoId}&key=${this.apiKey}&part=snippet,statistics`;

    try {
      const response = await axios.get(apiUrl);
      if (response.data.items && response.data.items.length > 0) {
        this.videoDetails = response.data.items[0];
        console.log('Detalles del video:', this.videoDetails);
      }
    } catch (error) {
      console.error('Error al obtener los detalles del video:', error);
    }
  }



  async getCurrentPosition() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      this.center = { lat: this.latitude, lng: this.longitude };
      this.markerPosition = this.center;

      console.log('Ubicación actual:', this.center);

      // Enviar notificación con la ubicación
      await this.sendNotification(
        'Ubicación actual',
        `Latitud: ${this.latitude}, Longitud: ${this.longitude}`
      );
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }

  async loadNews(event?: any) {
    if (this.isLoading) return;
    this.isLoading = true;

    try {
      const response = await this.newsService.getNewsInSpanish(
        this.currentPage,
        this.pageSize
      );
      this.articles.push(...response.articles);



      if (event) {
        event.target.complete();
      }

      if (response.articles.length < this.pageSize && event) {
        event.target.disabled = true;
      }
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      this.isLoading = false;
      this.currentPage++;
    }
  }

  // Método para enviar notificaciones locales
  async sendNotification(title: string, body: string) {
    // Solicitar permisos de notificación
    const permissions = await LocalNotifications.checkPermissions();
    
    if (permissions.display !== 'granted') {
      const permissionRequest = await LocalNotifications.requestPermissions();
      if (permissionRequest.display === 'denied') {
        alert('Permiso denegado para notificaciones');
        return;
      }
    }

    // Programar la notificación
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: title,
            body: body,
            id: new Date().getTime(), // ID único usando timestamp
            schedule: { at: new Date(new Date().getTime() + 1000) }, // Notificación programada para 1 segundo después
          },
        ],
      });
    } catch (error) {
      console.error('Error al programar la notificación:', error);
    }
  }
}
