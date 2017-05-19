import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'who-is-page',
  templateUrl: 'whois.html'
})
export class WhoIsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goBack() {
    this.navCtrl.pop();
  }

}