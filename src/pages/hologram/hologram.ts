import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'hologram-page',
  templateUrl: 'hologram.html'
})
export class HologramPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goBack() {
    this.navCtrl.pop();
  }

}