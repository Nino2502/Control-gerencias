import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../home/weather.service';
import { Geolocation } from '@capacitor/geolocation'; 
import { NewsService } from './news.service'; 
import { NavController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: false
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
    private newsService: NewsService,
    private authService: AuthService,
    private navCtrl: NavController,
  ) {}

  async ngOnInit() {
    await this.getCurrentPosition();
    this.getWeatherData();
    this.loadNews();
    if (!this.authService.isAuthenticated()) {
      this.navCtrl.navigateRoot('/inicio'); // Redirigir a login si no está autenticado
    }
  }

  async getWeatherData() {
    try {
      this.weatherData = await this.weatherService.getWeather(this.city);
      console.log('Weather Data:', this.weatherData);
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

  cerrar_sesion(){
    console.log("Soy cerrar sesion . .");
    localStorage.removeItem('authToken');
    this.navCtrl.navigateRoot('/inicio');
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  async getCurrentPosition() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.center = { lat: this.latitude, lng: this.longitude };
      this.markerPosition = this.center;
      console.log('Ubicación actual:', this.center);
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
}
