import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        platform.pause.subscribe(() => {
            var currentSeconds = new Date().getTime() / 1000;
            localStorage.setItem("appPausedTime", currentSeconds.toString());
            console.log('[INFO] App paused');
        });

        platform.resume.subscribe(() => {
            events.publish('resumeTimer');
            console.log('[INFO] App resumed');
        });

      statusBar.styleDefault();

      setTimeout(() => {
        splashScreen.hide();
      }, 100);    
    });
  }
}