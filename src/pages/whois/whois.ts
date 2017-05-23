import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { Firebase } from "@ionic-native/firebase";

@Component({
  selector: 'who-is-page',
  templateUrl: 'whois.html'
})
export class WhoIsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: Firebase) {
      this.firebase.setScreenName("who_is_zymo")
  }

  goBack() {
    this.logEvent("select_content", {content_type:"close_who_is", item_id:"close_button"});
    this.navCtrl.pop();
  }

  logEvent(eventName:string, eventBundle:object){
    this.firebase.logEvent(eventName, eventBundle);
  }

}