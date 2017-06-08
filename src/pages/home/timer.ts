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
        events.subscribe('resumeTimer', () => { //resume timer event should initialize the timer.
            this.initTimer();
        })

        events.subscribe('timerReset', () => { //resets the timer to attribute on timer element (home.html)
            localStorage.setItem("timer", this.timeInSeconds.toString());
            this.schedulePush();
            this.initTimer();
        })

        platform.pause.subscribe(() => { //store time app is paused
            this.pauseTimer();
            var currentSeconds = new Date().getTime() / 1000;
            localStorage.setItem("appPausedTime", currentSeconds.toString());
        });
    }

    ngOnInit() { //on application start
        this.schedulePush();
        this.initTimer();
    }

    hasFinished() {
        return this.timer.hasFinished;
    }

    initTimer() {
        //if timeInSeconds (set on home.html timer element) isn't valid, set to 0
        if (!this.timeInSeconds) {
            this.timeInSeconds = 0;
        }

        //detect first start and then set timer to 0 to trigger a treasure chest
        if (localStorage.getItem("firstStart") == "true") {
            localStorage.setItem("timer", "0");
            localStorage.setItem("firstStart", "false");
        }

        //get time remaining if there is one
        var timeRemaining = parseInt(localStorage.getItem("timer"));

        //initialize timer
        this.timer = <ITimer>{
            seconds: this.timeInSeconds,
            runTimer: false,
            hasStarted: false,
            hasFinished: false,
            secondsRemaining: this.timeInSeconds
        };

        //This is to find the time remaining after the app has been paused or killed
        //if we don't have a start time for the timer, set one
        if (localStorage.getItem("appTimerStart") == "null") {
            localStorage.setItem("appTimerStart", (new Date().getTime() / 1000).toString());
        } else { //otherwise get that start time and calculate time remaining
            var currentSeconds = new Date().getTime() / 1000;
            var appStart = parseInt(localStorage.getItem("appTimerStart"));
            timeRemaining = (this.timeInSeconds - (currentSeconds - appStart));
        }

        //if the time remaining after app resume is greater than zero, run the timer
        if (timeRemaining > 0) {
            this.timer.seconds = timeRemaining;
            this.timer.secondsRemaining = timeRemaining;
            this.timer.runTimer = true;
        } else { //else, kill the timer/mark as finished
            this.timer.seconds = 0;
            this.timer.secondsRemaining = 0;
            this.timer.hasFinished = true;
        }

        //set the timer display
        this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
        //run the timer
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
        //tick the timer down by second using a timeout
        this.runningTimer = setTimeout(() => {
            if (!this.timer.runTimer) { return; }
            this.timer.secondsRemaining--; //decrement timer
            this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
            if (this.timer.secondsRemaining > 0) { //if theres time left
                //recursively call this function to decrement the time
                this.timerTick();
                //store the time in the event the app is paused
                localStorage.setItem("timer", this.timer.secondsRemaining.toString());
            }
            else { //if theres no time left, kill the timer
                localStorage.setItem("timer", "0"); 
                this.timer.hasFinished = true;
                this.events.publish("timerFinished");
                localStorage.setItem("treasureAvailable","true"); //set treasure to available
                localStorage.setItem("appTimerStart", null);
                this.events.publish("timerReset"); //reset the timer so the user gets a prize in another hour.
            }
        }, 1000); //1 second
    }

    getSecondsAsDigitalClock(inputSeconds: number) { //formatting the time as HH:MM:SS
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

    schedulePush() { //schedule a local notification to alert the user to a new rewarrrdddd
        this.localNotifications.schedule({
            text: 'You have loot to open from Zymo!',
            at: new Date(new Date().getTime() + (this.timeInSeconds * 1000)),
            led: 'FF0000',
            sound: null
        });
    }

}