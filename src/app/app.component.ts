import { Component } from '@angular/core';
import { Platform, Events, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from "@ionic-native/device";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  appName: any;
  packageName: any;
  versionCode: any;
  versionNumber: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public events: Events,
    private appVersion: AppVersion,
    private device: Device,
    private app: App,
  ) {
    platform.ready().then(() => {
      var self = this;

      this.appVersion.getAppName().then(
        function(an) {
          self.appName = an;
        },
        function(err){
          console.log("Error retrieving app name.", err);
        }
      );
      this.appVersion.getPackageName().then(
        function(pn) {
          self.packageName = pn;
        },
        function(err){
          console.log("Error retrieving package name.", err);
        }
      );
      this.appVersion.getVersionCode().then(
        function(vc) {
          self.versionCode = vc;
        },
        function(err){
          console.log("Error retrieving version code.", err);
        }
      );
      this.appVersion.getVersionNumber().then(
        function(vn) {
          self.versionNumber = vn;
        },
        function(err){
          console.log("Error retrieving version number.", err);
        }
      );

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

      if(localStorage.getItem("firstStart") === null) {
         localStorage.setItem("firstStart", "true");
      }

      statusBar.styleDefault();

      setTimeout(() => {
        splashScreen.hide();
      }, 100);

      this.app._setDisableScroll(false);
      
    });
  }
}