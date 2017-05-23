import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { Firebase } from "@ionic-native/firebase";

@Component({
  selector: 'hologram-page',
  templateUrl: 'hologram.html'
})
export class HologramPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: Firebase) {
      this.firebase.setScreenName("hologram_setup")
  }

  goBack() {
    this.logEvent("select_content", {content_type:"go_back", item_id:"back_button_hologram"});
    this.navCtrl.pop();
  }

  logEvent(eventName:string, eventBundle:object){
      this.firebase.logEvent(eventName, eventBundle);
  }
}