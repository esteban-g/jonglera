import { Component } from '@angular/core';

/**
 * Generated class for the TimerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class TimerComponent {

  text: string;

  private minutes: number = 0;
  private secondes: number = 0;
  private totalSecondes: number = 0;
  private timer;
  constructor() {
    console.log('Hello TimerComponent Component');
    this.text = 'Hello World';
  }


  start() {
    this.timer = setInterval(() => {
      this.minutes = Math.floor(++this.totalSecondes / 60);
      this.secondes = this.totalSecondes - this.minutes * 60;
    }, 1000);
  }

  stop() {
    clearInterval(this.timer);
  }

  reset() {
    this.totalSecondes = this.minutes = this.secondes = 0;
  }
}
