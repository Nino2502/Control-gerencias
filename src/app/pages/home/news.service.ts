import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = '8b364ebb6020b3125893896e62326e4d';
  private apiUrl = 'https://gnews.io/api/v4/top-headlines';

  constructor() {}

  // Método para obtener noticias con paginación
  async getNewsInSpanish(page: number = 1, pageSize: number = 10): Promise<any> {
    const url = `${this.apiUrl}?lang=es&country=mx&page=${page}&max=${pageSize}&token=${this.apiKey}`;
    try {
      const response = await axios.get(url);
      return response.data; // Retorna las noticias
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }
}
