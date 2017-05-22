import { Component } from "@angular/core";
import { NavController, NavParams, Events } from 'ionic-angular';
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
    confirmOpen: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private device: Device) {
        this.isGIFHidden = false;
        this.isQRHidden = true;
        this.confirmOpen = false;
    }

    goBack() {
        this.navCtrl.pop();
    }

    restartGifAnimation = function () {
        this.treasureChestGif = "assets/images/chest.gif" + "?q=" + this.uuid;
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

    resetTimer() {
        this.events.publish("timerReset");
    }

    closeConfirm() {
        this.confirmOpen = false;
    }

    openConfirm() {
        this.confirmOpen = true;
    }

    confirm() {
        this.closeConfirm();
        this.resetTimer();
        this.goHome();
    }

    ionViewWillEnter() {
        this.uuid = UUID.UUID();
        this.setQRCode();
        this.restartGifAnimation();
    }

    goHome() {
        this.navCtrl.pop();
    }

}