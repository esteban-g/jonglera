import { Component } from '@angular/core';

/**
 * Generated class for the StateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'state',
  templateUrl: 'state.html'
})
export class StateComponent {

  text: string;
  public play: boolean = true;  
	public stop: boolean = false;
	public backward: boolean = false;
  constructor() {
    console.log('Hello StateComponent Component');
    this.text = 'Hello World';
  }


  
	setPlay() {
		this.stop = true;
		this.play = this.backward = false;    
	}

	setStop() {
		this.stop = false;
		this.play = this.backward = true;    
	}

	setBackward() {
		this.play = true;
		this.stop = this.backward = false;    
}

}
