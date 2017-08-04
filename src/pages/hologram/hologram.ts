import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { Firebase } from "@ionic-native/firebase";

@Component({
  selector: 'hologram-page',
  templateUrl: 'hologram.html'
})
export class HologramPage {
  hologramUrl: string;
  currentHologramIdx: number;
  urls: Array<string>;
  animateHolo: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: Firebase) {
      this.firebase.setScreenName("hologram_view");
      this.animateHolo = false;
      this.urls = ["assets/images/gif/hologram_360.gif",
                  "assets/images/gif/gilaMonster.gif",
                  "assets/images/gif/jlo.gif",
                  "assets/images/gif/jordan.gif",
                  "assets/images/gif/lacrosse.gif",
                  "assets/images/gif/logitech.gif",
                  "assets/images/gif/owl.gif",
                  "assets/images/gif/penguin.gif",
                  "assets/images/gif/ring.gif",
                  "assets/images/gif/scarygirl.gif",
                  "assets/images/gif/ship.gif",
                  "assets/images/gif/tesla.gif",
                  "assets/images/gif/turret.gif",
                  "assets/images/gif/yeti.gif",
                  "assets/images/gif/zombie.gif",];
      let random_num: number = (Math.round(Math.random() * 15) )
      this.currentHologramIdx = random_num;
      this.assignUrl(this.currentHologramIdx);
  }

  goBack() {
    this.logEvent("select_content", {content_type:"go_back", item_id:"back_button_hologram"});
    this.navCtrl.pop();
  }

  logEvent(eventName:string, eventBundle:object){
      this.firebase.logEvent(eventName, eventBundle);
  }

  assignUrl(idx:number){
    this.hologramUrl = this.urls[idx];
  }

  nextHolo() {
    if(this.currentHologramIdx == this.urls.length-1) {
      this.currentHologramIdx = 0;
    }
    else{
      this.currentHologramIdx += 1;
    }
    this.animateHologram();
  }

  prevHolo() {
    if(this.currentHologramIdx == 0) {
      this.currentHologramIdx = this.urls.length-1;
    }
    else{
      this.currentHologramIdx -= 1;
    }
    this.animateHologram();
  }

  animateHologram() {
    this.animateHolo = true;
    setTimeout(() => {
       this.assignUrl(this.currentHologramIdx);
    }, 650
    );
    setTimeout(() => {
      this.animateHolo = false;
    }, 800
    );
  }

}