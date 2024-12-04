import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../home/weather.service';  // Asegúrate de importar el servicio correctamente

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  city: string = 'mexico';  // O cualquier ciudad por defecto
  weatherData: any;

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
}
