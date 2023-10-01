import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  private apiKey = 'd84376da4362e0e7339613795c1fcbe0';
  private apiUrlForCurrentWeather = 'https://api.openweathermap.org/data/2.5/weather';
  private apiUrlForWeatherForecast = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient,

    private toastController: ToastController) { }

  getCurrentWeather(cityName: string): Observable<any> {
    const params = {
      q: cityName,
      apiKey: this.apiKey,
      units: 'metric'
    };
    return this.http.get(this.apiUrlForCurrentWeather, { params });
  }

  getWeatherForecast(cityName: string): Observable<any> {
    const params = {
      q: cityName,
      apiKey: this.apiKey,
      units: 'metric',
      cnt: 5
    };
    return this.http.get(this.apiUrlForWeatherForecast, { params });
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }
}
