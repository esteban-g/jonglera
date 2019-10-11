import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ViewController, Platform, ActionSheetController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';

/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {


  objectKeys = Object.keys;
  value = { option1: 'Driving', option2: 'Soothing', option3: 'Protecting' };  
  newevent = { title: '', location: '', notes: '' , startdate: '', starttime:'', enddate: '',  endtime: '', emotion: ''};  
  scssclass = { op1: 'driving', op2: 'soothing', op3: 'protecting' };  

  
  feeling = { driving: "", soothing: "", protecting: ""};
  responsesq1 = { q1: '', q2: '', q3: '' , q4: '', q5: ''};  


  loginForm:FormGroup;
  responseData:any;
  userData={"provider":"web","email":"","password":""};

  todo = {}
  brightness: number = 20;
  contrast: number = 0;

  constructor(
    public fb: FormBuilder,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    // private _cdr: ChangeDetectorRef,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public viewCtrl: ViewController,
    private database: DatabaseProvider

    ) {
  }



/******* FUNCTIONS ******/


// CreateUser(){
//   this.database.CreateUser("esteban","esteban@se",30,60,90,"x").then((data) => {
//     var ccc = data;
//     alert(ccc);
//     alert(data);
//     console.log(data);
//   }, (error) => {
//     console.log(error);
//   })
// }



addEvent(){
 //db.executeSql("CREATE TABLE IF NOT EXISTS plans  (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, notes TEXT, objective TEXT,  validstart TEXT, validend TEXT, id_users INTEGER)", [])
console.log('addEvent:',this.newevent.title+'_'+this.newevent.location+'_'+
this.newevent.notes+'_'+this.newevent.startdate+'_'+this.newevent.starttime+'_'+
this.newevent.enddate+'_'+this.newevent.endtime
);

  this.database.CreatePlan(this.newevent.title,"future",this.newevent.notes,"objective",this.newevent.startdate+" "+this.newevent.starttime,this.newevent.enddate+" "+this.newevent.endtime,1).then((data) => {
    var rir= data;

    //alert(this.newevent.startdate+"/"+this.newevent.starttime);
    //console.log('add-events OK AddEvent msg:');
    console.log(rir);
  }, (error) => {
    console.log('add-events ERROR AddEvent msg:');
    console.log(error);
  })
}

getAllPlans(){
  this.database.GetAllPlans().then((data)=> {
    var vfvf = data;
    // console.log('add-events OK  GetAllPlans msg:');
     console.log(vfvf);
  }, (error) => {
    console.log('add-events ERROR  GetAllPlans msg:'+error);
  })
}

addeventform() {
  //console.log(this.todo)
  console.log('OK TEST');

  this.addEvent();
  this.getAllPlans();
  this.viewCtrl.dismiss();
}

dismiss() {
  this.viewCtrl.dismiss();
}


addActivty(){
  

  this.database.AddActivity("running","indoor","performance",0,"precondition","postcondition","DATESTART","DATEEND",100,1).then((data) => {
    // alert(data);
    var ccc = data;
    console.log(ccc);
  }, (error) => {
    console.log(error);
  })
}
getAllActivities(){
  this.database.GetAllActivities().then((data)=> {
    console.log(data);
  }, (error) => {
    console.log(error);
  })
}

/*
  save() {
    this.calendar.createEvent(this.newevent.title, this.newevent.location, this.newevent.notes, new Date(this.newevent.startdate), new Date(this.newevent.enddate)).then(
      (msg) => {
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Event saved successfully' + 'driving:'+this.feeling.driving+ 'soo:'+this.feeling.soothing+ 'prot:'+this.feeling.protecting ,
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop();
      },
      (err) => {
        let alert = this.alertCtrl.create({
          title: 'Failed!',
          subTitle: err,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }
*/  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Play',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
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
