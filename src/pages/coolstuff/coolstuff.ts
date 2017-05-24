import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { HologramPage } from "../hologram/hologram";
import { Firebase } from "@ionic-native/firebase";

@Component({
  selector: 'cool-stuff-page',
  templateUrl: 'coolstuff.html'
})
export class CoolStuffPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: Firebase) {
      this.firebase.setScreenName("hologram_setup")
  }

  goBack() {
    this.logEvent("select_content", {content_type:"go_back", item_id:"back_button_cool_stuff"});
    this.navCtrl.pop();
  }

  goToHologram(){
      this.navCtrl.push(HologramPage);
  }

  logEvent(eventName:string, eventBundle:object){
      this.firebase.logEvent(eventName, eventBundle);
  }
}