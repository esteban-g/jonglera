import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, Platform } from 'ionic-angular';
import { Question1Page } from '../question1/question1';
import { Question2Page } from '../question2/question2';
import { Question3Page } from '../question3/question3';
import { AddEventPage } from '../add-event/add-event';

/**
 * Generated class for the NowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-now',
  templateUrl: 'now.html',
})
export class NowPage {


  public buttonColor: string = "bla";
  public picToViewZ = "../assets/img/domo-mini2.png"
  newactivity = [
    {
      "time": "7:00",
      "name": "Frukost",
      "color":"gron",
      "outline":"true",
      "solid":"false",
      "ejgjort": "false",
      "gjort": "false"
    },
    {
      "time": "9:00",
      "name": "Mellanmål",
      "color":"gron",
      "outline":"true",
      "solid":"false",
      "ejgjort": "false",
      "gjort": "true"
    },
    {
      "time": "10:00",
      "name": "Läkarbesök ",
      "color":"rod",
      "outline":"false",
      "solid":"true",
      "ejgjort": "false",
      "gjort": "true"
    },
    {
      "time": "12:00",
      "name": "Lunch",
      "color":"gron",
      "outline":"true",
      "solid":"false",
      "ejgjort": "false",
      "gjort": "true"
    },{
      "time": "15:00",
      "name": "Fika",
      "color":"gron",
      "outline":"true",
      "solid":"false",
      "ejgjort": "false",
      "gjort": "true"
    },
    {
      "time": "18:00",
      "name": "Middag",
      "color":"gron",
      "ejgjort": "false",
      "gjort": "true"
    }
  
  ];

  itemsdata = [
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
    '24:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00'
  ];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NowPage');
  }

  itemSelected(items: string) {
    //console.log("Selected Item", this.itemsdata);
    var ccc = items;
    console.log("Selected Item", ccc);
    this.buttonColor = "gron";
  }


  presentQuestion1Modal() {
    let modal = this.modalCtrl.create(Question1Page);
    modal.present();
  }

  presentQuestion2Modal() {
    let modal2 = this.modalCtrl.create(Question2Page);
    modal2.present();
  }

  presentQuestion3Modal() {
    const modal3 = this.modalCtrl.create(Question3Page);
    modal3.present();
  }


  addEvent() {
    this.navCtrl.push(AddEventPage);
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Handlingar',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Ta bort',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Dela',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Favorit',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Avbryt',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
}


}
