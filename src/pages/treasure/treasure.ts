import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { UUID } from 'angular2-uuid';

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

    constructor(public navCtrl: NavController, public navParams: NavParams, private device: Device) {
        this.isGIFHidden = false;
        this.isQRHidden = true;
    }

    goBack() {
        this.navCtrl.pop();
    }

    restartGifAnimation = function () {
        this.treasureChestGif = "../www/assets/images/chest.gif" + "?q=" + this.uuid;
        this.hideGIF();
        this.showQR();
    }

    setQRCode = function () {
        this.qrCodeData = "zymo-" + this.device.platform + "-" + this.device.version + "-" + this.device.manufacturer + "-" + this.device.model + "-" + this.uuid;
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
    }

    ionViewWillEnter() {
        this.uuid = UUID.UUID();
        this.setQRCode();
        this.restartGifAnimation();
    }

}