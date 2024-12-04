import { Injectable } from '@angular/core';
import axios from 'axios';  // Importamos axios

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '4392eafccd3ebea6be3f4a8bdf1eb474'; // Tu clave de API de OpenWeatherMap
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor() {}

  async getWeather(city: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`); // Asegúrate de añadir unidades en °C
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data', error);
      throw error;  // Lanza el error para manejarlo más adelante
    }
  }
}
