import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  forecastData: any;
  cityName: string = '';
  isOnline: boolean = true;

  constructor(private weatherService: WeatherServiceService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {

  }

  async getData() {
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
    this.weatherService.getWeatherForecast(this.cityName).subscribe(
      (data) => {
        if (data) {
          this.forecastData = data.list;
        }
        loading.dismiss();
      },
      (error) => {
        console.error('Error fetching weather forecast:', error);
        this.weatherService.presentErrorToast("error getting weather data")
      }
    );
  }

  formatUnixTimestamp(unixTimestamp: number) {
    const timestamp = unixTimestamp * 1000;
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday = weekdays[date.getDay()];

    return `${day}-${month}-${year} ${weekday}`;
  }

}
