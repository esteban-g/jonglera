import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { ExplanationPage } from '../explanation/explanation';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  background: string;
  contentEle: any;
  textEle: any;
  fontFamily;

  colors = {
    'white': {
      'bg': 'rgb(255, 255, 255)',
      'fg': 'rgb(0, 0, 0)'
    },
    'tan': {
      'bg': 'rgb(249, 241, 228)',
      'fg': 'rgb(0, 0, 0)'
    },
    'grey': {
      'bg': 'rgb(76, 75, 80)',
      'fg': 'rgb(255, 255, 255)'
    },
    'black': {
      'bg': 'rgb(0, 0, 0)',
      'fg': 'rgb(255, 255, 255)'
    },
  };

  constructor(public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public navParams: NavParams
    ) {
  }

  ngOnInit() {
  }


  presentExplanationModal() {
    const modal3 = this.modalCtrl.create(ExplanationPage);
    modal3.present();
  }


    getColorName(background) {
    let colorName = 'white';

    if (!background) return 'white';

    for (var key in this.colors) {
      if (this.colors[key].bg == background) {
        colorName = key;
      }
    }

    return colorName;
  }

testFunction(){}

  setFontFamily() {
    console.log("changeBack");
  }

  changeBackground(color) {
    console.log("changeBackground:"+color);
    
  }

  changeFontSize(direction) {
    console.log("changeBackground:"+direction);
  }

  changeFontFamily() {
    console.log("changeBackground:");
  }
}