import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { QRCodeModule } from 'angular2-qrcode';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WhoIsPage } from "../pages/whois/whois";
import { TreasurePage } from "../pages/treasure/treasure";
import { CoolStuffPage } from "../pages/coolstuff/coolstuff";
import { TimerComponent } from '../pages/home/timer';
import { HologramPage } from "../pages/hologram/hologram";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { AppVersion } from "@ionic-native/app-version";
import { Device } from "@ionic-native/device";
import { Firebase } from "@ionic-native/firebase";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WhoIsPage,
    TreasurePage,
    CoolStuffPage,
    HologramPage,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    QRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WhoIsPage,
    TreasurePage,
    HologramPage,
    CoolStuffPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    AppVersion,
    Device,
    Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
