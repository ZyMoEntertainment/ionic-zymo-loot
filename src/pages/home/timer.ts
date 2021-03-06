import { Component, Input } from '@angular/core';
import { ITimer } from './itimer';
import { Events, Platform } from "ionic-angular";
import { LocalNotifications } from '@ionic-native/local-notifications';


@Component({
    selector: 'timer',
    templateUrl: 'timer.html'
})
export class TimerComponent {

    @Input() timeInSeconds: number;
    public timer: ITimer;
    public runningTimer: any;

    constructor(public platform: Platform, public events: Events, private localNotifications: LocalNotifications) {
        events.subscribe('resumeTimer', () => {
            this.initTimer();
        })

        events.subscribe('timerReset', () => {
            localStorage.setItem("timer", this.timeInSeconds.toString());
            this.schedulePush();
            this.initTimer();
        })

        platform.pause.subscribe(() => {
            this.pauseTimer();
            var currentSeconds = new Date().getTime() / 1000;
            localStorage.setItem("appPausedTime", currentSeconds.toString());
        });
    }

    ngOnInit() {
        this.schedulePush();
        this.initTimer();
    }

    hasFinished() {
        return this.timer.hasFinished;
    }

    initTimer() {
        if (!this.timeInSeconds) {
            this.timeInSeconds = 0;
        }

        if (localStorage.getItem("firstStart") == "true") { //detect first start and then set timer to 0 to trigger a treasure chest
            localStorage.setItem("timer", "0");
            localStorage.setItem("firstStart", "false");
        }

        var timeRemaining = parseInt(localStorage.getItem("timer"));

        this.timer = <ITimer>{
            seconds: this.timeInSeconds,
            runTimer: false,
            hasStarted: false,
            hasFinished: false,
            secondsRemaining: this.timeInSeconds
        };

        // var currentSeconds = new Date().getTime() / 1000;
        // var pausedTime = parseInt(localStorage.getItem("appPausedTime"));

        // if (pausedTime > 0) {
        //     timeRemaining = (timeRemaining - (currentSeconds - pausedTime));
        //     localStorage.removeItem("appPausedTime");
        // }

        if (localStorage.getItem("appTimerStart") == "null") {
            localStorage.setItem("appTimerStart", (new Date().getTime() / 1000).toString());
        } else {
            var currentSeconds = new Date().getTime() / 1000;
            var appStart = parseInt(localStorage.getItem("appTimerStart"));        
            timeRemaining = (this.timeInSeconds - (currentSeconds - appStart));
        }

        if (timeRemaining > 0) {
            this.timer.seconds = timeRemaining;
            this.timer.secondsRemaining = timeRemaining;
            this.timer.runTimer = true;
        } else {
            this.timer.seconds = 0;
            this.timer.secondsRemaining = 0;
            this.timer.hasFinished = true;
        }

        this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
        this.startTimer();
    }

    startTimer() {
        this.timer.hasStarted = true;
        this.timer.runTimer = true;
        clearTimeout(this.runningTimer);
        this.timerTick();
    }

    pauseTimer() {
        this.timer.runTimer = false;
    }

    resumeTimer() {
        this.startTimer();
    }

    timerTick() {
        this.runningTimer = setTimeout(() => {
            if (!this.timer.runTimer) { return; }
            this.timer.secondsRemaining--;
            this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
            if (this.timer.secondsRemaining > 0) {
                this.timerTick();
                localStorage.setItem("timer", this.timer.secondsRemaining.toString());
            }
            else {
                localStorage.setItem("timer", "0");
                this.timer.hasFinished = true;
                this.events.publish("timerFinished");
                localStorage.setItem("appTimerStart", null);
            }
        }, 1000);
    }

    getSecondsAsDigitalClock(inputSeconds: number) {
        var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString = '';
        hoursString = (hours < 10) ? "0" + hours : hours.toString();
        minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
        secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
        if (inputSeconds == 0) {
            return "";
        }
        return hoursString + ':' + minutesString + ':' + secondsString;
    }

    schedulePush() {
        this.localNotifications.schedule({
            text: 'You have loot to open from Zymo!',
            at: new Date(new Date().getTime() + (this.timeInSeconds * 1000)),
            led: 'FF0000',
            sound: null
        });
    }

}