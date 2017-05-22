import { Component } from '@angular/core';
import { NavController, ModalController, Events } from 'ionic-angular';
import { WhoIsPage } from '../whois/whois';
import { TreasurePage } from '../treasure/treasure';
import { CoolStuffPage } from "../coolstuff/coolstuff";
import { ViewChild } from '@angular/core';
import { TimerComponent } from './timer';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  treasureUrl: string;
  treasureAvailable: boolean;
  @ViewChild(TimerComponent) timer: TimerComponent;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public events: Events) {
    this.treasureUrl = "assets/images/no-chest.png";

    events.subscribe('timerFinished', () => {
      this.treasureAvailable = true;
      this.treasureUrl = "assets/images/yes-chest.png";
    })

    events.subscribe('timerReset', () => {
      this.treasureAvailable = false;
      this.treasureUrl = "assets/images/no-chest.png";
    })

  }

  goToWhoIs(event) {
    //this.navCtrl.push(WhoIsPage);
    let zymoModal = this.modalCtrl.create(WhoIsPage);
    zymoModal.present();
  }

  goToTreasure(event) {
    this.navCtrl.push(TreasurePage);
  }

  goToCoolStuff(event) {
    this.navCtrl.push(CoolStuffPage);
  }

}
