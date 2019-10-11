import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the Question3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question3',
  templateUrl: 'question3.html',
})
export class Question3Page {


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


  responsesq1 = { q1: 0, q2: 0, q3:  0, q4: 0, q5: 0};  

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
    console.log('q4',this.responsesq1.q5);


    this.database.AddNewAnswer('','',this.responsesq1.q1,'',0,'','','', 'nu1');
    this.database.AddNewAnswer('','',this.responsesq1.q2,'',0,'','','', 'nu2');
    this.database.AddNewAnswer('','',this.responsesq1.q3,'',0,'','','', 'nu3');
    this.database.AddNewAnswer('','',this.responsesq1.q4,'',0,'','','', 'nu4');

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
