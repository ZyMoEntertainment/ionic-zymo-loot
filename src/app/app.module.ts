import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WhoIsPage } from "../pages/whois/whois";
import { TreasurePage } from "../pages/treasure/treasure";
import { QRCodeModule } from "angular2-qrcode/lib";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WhoIsPage,
    TreasurePage
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
    TreasurePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
