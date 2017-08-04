import { Component } from "@angular/core";
import { NavController, NavParams, Events } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { UUID } from 'angular2-uuid';
import { Firebase } from "@ionic-native/firebase";

@Component({
    selector: 'treasure-page',
    templateUrl: 'treasure.html',
    providers: [Device]
})
export class TreasurePage {
    treasureChestGif: string;
    uuid: string;
    qrCodeData: string;
    isGIFHidden: boolean;
    isQRHidden: boolean;
    confirmOpen: boolean;
    treasureAvailable: boolean;
    showAnimation: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private device: Device, private firebase: Firebase) {
        this.showAnimation = false;
        if(localStorage.getItem("showAnimation") == 'true' || localStorage.getItem("showAnimation") == null){
            this.showAnimation = true;
        }
        if(this.showAnimation) {
            this.isGIFHidden = false;
            this.isQRHidden = true;
        } else {
            this.isGIFHidden = true;
            this.isQRHidden = false;
        }
        this.confirmOpen = false;

        events.subscribe('timerFinished', () => {
            localStorage.setItem("showAnimation", "true");
        })

        this.firebase.setScreenName("claim_treasure")
    }

    goBack = function () {
        this.logEvent("select_content", {content_type:"go_back", item_id:"back_button_treasure"});
        this.navCtrl.pop();
    }

    restartGifAnimation = function () {
        this.treasureChestGif = "assets/images/chest.gif" + "?q=" + this.uuid;
        this.hideGIF();
        this.showQR();
    }

    setQRCode = function () {
        if(this.showAnimation || localStorage.getItem("qrCode") == null) {
            this.uuid = UUID.UUID();
            this.qrCodeData = "zymo-" + this.device.platform + "-" + this.device.version + "-" + this.device.manufacturer + "-" + this.device.model + "-" + this.uuid;
            localStorage.setItem("qrCode", this.qrCodeData.toLowerCase().replace(" ","-"));
            localStorage.setItem("showAnimation", "false");
            this.showAnimation = false;
        } else {
            this.qrCodeData = localStorage.getItem("qrCode").toLowerCase().replace(" ","-");
        }
    }

    hideGIF = function () {
        setTimeout(function () {
            this.isGIFHidden = true;
        }.bind(this), 4000);
    }

    showQR = function () {
        setTimeout(function () {
            this.isQRHidden = false;
        }.bind(this), 3500);
        this.logEvent("present_offer", {item_id:this.uuid, item_name: this.qrCodeData, item_category: "qr_code", quantity: 1});
    }

    // resetTimer = function () {
    //     this.events.publish("timerReset");
    // }

    treasureClaimed = function() {
        localStorage.setItem("treasureAvailable", "false");
        localStorage.setItem("firstStart", "false");
    }

    closeConfirm = function () {
        this.logEvent("select_content", {content_type:"close_confirm", item_id:"confirm_no_button"});
        this.confirmOpen = false;
    }

    openConfirm = function () {
        this.logEvent("select_content", {content_type:"open_confirm", item_id:"reedemed_button"});
        this.confirmOpen = true;
    }

    confirm = function () {
        this.logEvent("select_content",{content_type: "treasure_claimed", item_id: "confirm_yes_button"});
        this.confirmOpen = false;
        this.treasureClaimed();
        // this.resetTimer();
        this.goHome();
    }

    ionViewWillEnter = function () {
        // this.showAnimation = (localStorage.getItem("showAnimation") == 'true');
        if(this.showAnimation) {
            this.restartGifAnimation();
        }
        this.setQRCode();
    }

    goHome = function () {
        this.navCtrl.pop();
    }

    logEvent(eventName:string, eventBundle:object){
        this.firebase.logEvent(eventName, eventBundle);
    }

}