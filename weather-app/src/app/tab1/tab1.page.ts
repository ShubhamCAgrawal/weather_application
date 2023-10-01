import { Component } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  cityName: string = '';
  weatherData: any;
  isOnline: boolean = true;


  constructor(public weatherService: WeatherServiceService,
    private loadingController: LoadingController
  ) { }

  async searchWeather() {
    this.isOnline = navigator.onLine;
    if (!this.isOnline) {
      this.weatherService.presentErrorToast('No internet connection. Please check your network.');
      return;
    }
    const loading = await this.loadingController.create({
      message: 'Fetching weather data...',
      duration: 10000,
      spinner: 'crescent'
    });

    await loading.present();
    this.weatherService.getCurrentWeather(this.cityName).subscribe(
      (data) => {
        if (data) {
          this.weatherData = data;
        }
        loading.dismiss();
      },
      (error) => {
        console.error('Error fetching weather forecast:', error);
        this.weatherService.presentErrorToast("error getting weather data")
      }
    );
  }

}
