import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the Question2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question2',
  templateUrl: 'question2.html',
})
export class Question2Page {

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


  numq1 : number = 0;
  numq2 : number = 0;
  numq3 : number = 0;
  numq4 : number = 0;

  loginForm:FormGroup;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseProvider,
    public viewCtrl: ViewController,
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

        
    this.database.AddNewAnswer('','',this.responsesq1.q1,'',0,'','','', 'kvall1');
    this.database.AddNewAnswer('','',this.responsesq1.q2,'',0,'','','', 'kvall2');
    this.database.AddNewAnswer('','',this.responsesq1.q3,'',0,'','','', 'kvall3');
    this.database.AddNewAnswer('','',this.responsesq1.q4,'',0,'','','', 'kvall4');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
