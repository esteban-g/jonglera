import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Question1Page } from '../question1/question1';
import { Question2Page } from '../question2/question2';
import { Question3Page } from '../question3/question3';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  itemquestions = [
    'Morgon frågor',
    'Kväll frågor',
    'Nu frågor'
  ]

  questiondata = [
    {
      "question": "Morgon frågor",
      "numb": 4,
      "icon": "sunny"
    },
    {
      "question": "Kväll frågor",
      "numb": 3,
      "icon": "moon"
    },
    {
      "question": "Nu frågor",
      "numb": 1,
      "icon": "clock"
    }]


  text: string;



  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public navParams: NavParams) {
    console.log('Hello TimerComponent Component');
    this.text = 'Hello World';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  questionSelected(item: string) {
    console.log("Selected Item", item);
    var mor = /orgon/gi;
    var kva = /Kväll/gi;
    var nuf = /nu/gi;
    // var str = "Apples are round, and apples are juicy.";
    
    if (item.search(mor) != -1) {
      console.log("MOR");
      let modal = this.modalCtrl.create(Question1Page);
      modal.present();
      this.dismiss();
    } else if (item.search(kva) != -1) {
      console.log("KVA");
      let modal = this.modalCtrl.create(Question2Page);
      modal.present();
      this.dismiss();
    } else if (item.search(nuf) != -1) {
      console.log("NU");
      let modal = this.modalCtrl.create(Question3Page);
      modal.present();
      this.dismiss();
    }

  }





}
