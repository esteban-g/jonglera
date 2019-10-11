import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the Question1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question1',
  templateUrl: 'question1.html',
})
export class Question1Page {
  matches: String[];
  isRecording = false;
  gaming: string = "n64";
  gender: string = "f";
  os: string;
  music: string;
  month: string;
  year: number;

  brightness: number = 20;
  contrast: number = 0;
  warmth: number = 2.5;
  structure: any = { lower: 33, upper: 60 };
  text: number = 2.5;

  responsesq1 = { q1: 0, q2: 0, q3: 0 , q4: 0};  

  loginForm:FormGroup;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private database: DatabaseProvider,
    public modalCtrl: ModalController
  ) {
    this.loginForm = new FormGroup({
      firstName: new FormControl()
    });
  }

  addresponse(){
    console.log('q1',this.responsesq1.q1);
    console.log('q2',this.responsesq1.q2);
    console.log('q3',this.responsesq1.q3);
    console.log('q4',this.responsesq1.q4);


    
    this.database.AddNewAnswer('','',this.responsesq1.q1,'',0,'','','', 'morgon1');
    this.database.AddNewAnswer('','',this.responsesq1.q2,'',0,'','','', 'morgon2');
    this.database.AddNewAnswer('','',this.responsesq1.q3,'',0,'','','', 'morgon3');
    this.database.AddNewAnswer('','',this.responsesq1.q4,'',0,'','','', 'morgon4');

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
