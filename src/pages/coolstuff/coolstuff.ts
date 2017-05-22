import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { HologramPage } from "../hologram/hologram";

@Component({
  selector: 'cool-stuff-page',
  templateUrl: 'coolstuff.html'
})
export class CoolStuffPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goBack() {
    this.navCtrl.pop();
  }

  goToHologram(){
      this.navCtrl.push(HologramPage);
  }

}