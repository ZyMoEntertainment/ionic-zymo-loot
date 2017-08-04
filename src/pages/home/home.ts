import { Component } from '@angular/core';
import { NavController, ModalController, Events } from 'ionic-angular';
import { WhoIsPage } from '../whois/whois';
import { TreasurePage } from '../treasure/treasure';
import { CoolStuffPage } from "../coolstuff/coolstuff";
import { ViewChild } from '@angular/core';
import { TimerComponent } from './timer';
import { Firebase } from "@ionic-native/firebase";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  treasureUrl: string;
  treasureAvailable: boolean;
  @ViewChild(TimerComponent) timer: TimerComponent;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public events: Events, private firebase: Firebase) {
    this.treasureUrl = "assets/images/no-chest.png";

    events.subscribe('timerFinished', () => {
      this.treasureAvailable = true;
      this.logEvent("select_content", { content_type: "treasure_awarded", item_id: "treasure_available" });
      this.treasureUrl = "assets/images/yes-chest.png";
    })

    // events.subscribe('timerReset', () => {
    //   this.treasureAvailable = false;
    //   this.treasureUrl = "assets/images/no-chest.png";
    // })

    this.firebase.setScreenName("home");
  }

  goToWhoIs(event) {
    this.logEvent("select_content", { content_type: "open_who_is", item_id: "who_is_zymo_button" });
    let zymoModal = this.modalCtrl.create(WhoIsPage);
    zymoModal.present();
  }

  goToTreasure(event) {
    this.logEvent("select_content", { content_type: "open_treasure", item_id: "treasure_chest_button" });
    this.navCtrl.push(TreasurePage);
  }

  goToCoolStuff(event) {
    this.logEvent("select_content", { content_type: "open_hologram_setup", item_id: "cool_stuff_button" });
    this.navCtrl.push(CoolStuffPage);
  }

  logEvent(eventName: string, eventBundle: object) {
    this.firebase.logEvent(eventName, eventBundle);
  }

  ionViewWillEnter = function () {
    this.treasureAvailable = (localStorage.getItem("treasureAvailable") == 'true');
    if(this.treasureAvailable) {
      this.treasureUrl = "assets/images/yes-chest.png";
    } else {
      this.treasureUrl = "assets/images/no-chest.png";
    }
  }
}
