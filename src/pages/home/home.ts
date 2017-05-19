import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {WhoIsPage} from '../whois/whois';
import {TreasurePage} from '../treasure/treasure';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  treasureUrl: string;
  treasureAvailable: boolean;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.treasureUrl = "www/assets/images/no-chest.png";
  }

  goToWhoIs(event) {
    //this.navCtrl.push(WhoIsPage);
    let zymoModal = this.modalCtrl.create(WhoIsPage);
    zymoModal.present();
  }

  goToTreasure(event) {
    this.navCtrl.push(TreasurePage);
  }


}
