import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ViewController, ModalController, ToastController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { DatabaseProvider } from '../../providers/database/database';
import { AddEventPage } from '../add-event/add-event';
import { Question1Page } from '../question1/question1';
import { Question2Page } from '../question2/question2';
import { Question3Page } from '../question3/question3';
import { CoachPage } from '../coach/coach';

/**
 * Generated class for the PlannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planner',
  templateUrl: 'planner.html',
})
export class PlannerPage {


  public itemsxx: Array<any> = new Array();
  public itxx: number

  public aevent: Date;
  public bevent: Date;
  public cevent: Date;

  coords: any;
  //coords = {lat: 0, long: 0};
  accuracy: any;
  error: any;
  lat: any;
  lng: any;
  altitude: any;

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

  musicAlertOpts: { title: string, subTitle: string };
  listMenu: { title: string, subTitle: string };

  schevent = { title: '', location: '', notes: '', startdate: '', enddate: '', emotion: '' };
  feeling = { driving: "", soothing: "", protecting: "" };

  newevent = { title: 'TITLE', location: 'HOME', notes: 'NOTES', startdate: '2018-6-14', enddate: '2018-6-15', emotion: 'HAP' };
  newevent2 = { title: 'TITLE', location: 'HOME', notes: 'NOTES', startdate: '2018-6-14', enddate: '2018-6-15' };
  newevent3 = { title: 'XXX', location: 'YYY', notes: 'ZZZZ', startdate: '2018-6-28 18:48:54', enddate: '2018-6-29 18:48:54' };

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

  fullevent = {};

  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;

  demo = 'Navbar';
  favorites = 'recent';
  apps = 'free';

  eventList: any;
  fullEventList: Object[];
  selectedEvent: any;
  isSelected: any;

  newStartDate: Date;
  newEndDate: Date;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private calendar: Calendar,
    private database: DatabaseProvider,
    private platform: Platform,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {
    for (let i = 0; i < 10000; i++) {
      this.itxx = i;
      this.itemsxx.push('item ${i}');
    }

    this.test();

    this.musicAlertOpts = {
      title: '1994 Music',
      subTitle: 'Select your favorite'
    };

  }


  test() {
    this.date = new Date();
    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.getDaysOfMonth();

    this.loadEventThisMonth();
  }

  setEvent(_newevent) {
    this.newevent = _newevent;
    console.log('home setEvent __');
    console.log(this.newevent.title);
  }

  ionViewWillEnter() {
    this.date = new Date();
    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.getDaysOfMonth();

    this.loadEventThisMonth();
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    //thisNumOfDays = new Date(2018, 6, 18).getDate();


    for (var j = 0; j < thisNumOfDays; j++) {
      this.daysInThisMonth.push(j + 1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
    // var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var k = 0; k < (6 - lastDayThisMonth); k++) {
      this.daysInNextMonth.push(k + 1);
    }
    var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
    if (totalDays < 36) {
      for (var l = (7 - lastDayThisMonth); l < ((7 - lastDayThisMonth) + 7); l++) {
        this.daysInNextMonth.push(l);
      }
    }
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysOfMonth();
  }

  addEvent() {
    this.navCtrl.push(AddEventPage);
  }


  //db.executeSql("CREATE TABLaE IF NOT EXISTS activities  (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, objective TEXT, achievement REAL, precondition TEXT, postcondition TEXT, validstart TEXT, validend TEXT, energytotal REAL,  id_sessions INTEGER, FOREIGN KEY (id_sessions) REFERENCES sessions ON DELETE CASCADE)", [])

  addDefaultActivties() {
    this.database.AddActivity("running", "indoor", "performance", 0, "precondition", "postcondition", "DATESTART", "DATEEND", 100, 1).then((data) => {
      alert(data);
      console.log('home.ts addDefaultActivties() OK');
      console.log(data);
    }, (error) => {
      console.log('home.ts addDefaultActivties() ERROR');
      console.log(error);
    })
  }

  addCurrentSession() {
    this.database.CreateSession("test", "objective", "START", "END", 1).then((data) => {
      alert(data);
      console.log('home.ts addCurrentSession() OK');
      console.log(data);
    }, (error) => {
      console.log('home.ts addCurrentSession() ERROR');
      console.log(error);
    })
  }


  getAllPlans() {
    this.database.GetAllPlans().then((data) => {
      // console.log('add-events OK  GetAllPlans msg:');
      data;
      console.log(data);
    }, (error) => {
      console.log('add-events ERROR  GetAllPlans msg:' + error);
    })
  }

  loadEventThisMonth() {
    console.log('+++++++++++++++++++++++++++loadEventThisMonth()');
    //this.fullevent = new Array();
    //this.calendar.createEvent('2018-06-15');

    //console.log(new Date('2018-6-15 18:18:38'));

    //this.calendar.createEvent('XXXXXX','XXXyX','ZZZZZ',new Date('2018-6-19 18:18:38'),new Date('2018-6-19 18:18:38'));
    this.eventList = new Array();
    /***
     * vemos si saca de la base de datos con GetAllPlans y se los metemos a eventList directamente
     */

    this.eventList = [{
      title: 'Pick children',
      location: 'Skidspåret 6',
      notes: 'Pick children and ask teacher if baby eats or not',
      startDate: '2018-8-21 18:18:38',
      endDate: '2018-8-21 18:18:38',
    },
    {
      title: 'Buy some fruits in Coop',
      location: 'Coop Nära',
      notes: 'Dont forget to buy ecological oranges and milk',
      startDate: '2018-8-16 18:18:38',
      endDate: '2018-8-16 18:18:38',
    },
    {
      title: 'Take a walk',
      location: 'Nydala',
      notes: 'Take a walk after dinner ',
      startDate: '2018-8-20 19:18:38',
      endDate: '2018-8-20 20:18:38',
    }
    ];






    this.database.GetAllPlans().then((data) => {
      this.fullevent = data;
      if (data != null) {
        console.log('____0________add-events OK  GetAllPlans msg:');
        console.log(data);
        console.log('____1_______add-events OK  GetAllPlans msg:');
        console.log(this.eventList);
        console.log('____2_____add-events OK  GetAllPlans msg:');
        var xo = Object.assign(this.eventList, data);
        console.log(xo);
        console.log('____3______add-events OK  GetAllPlans msg:');
        var newArrayx = this.appendObjTo(this.eventList, data);
        console.log(newArrayx);
        console.log('____4______add-events OK  GetAllPlans msg:');
        console.log(this.eventList.length);
        console.log('____5______add-events OK  GetAllPlans msg:');

        console.log('____6____add-events OK  GetAllPlans msg:');



        ///this.eventList.push(this.fullevent);
        this.eventList.push(data);

        var xxxo = {
          title: 'Läkarbesök',
          location: 'c',
          notes: 'När du ska söka vård kan du själv välja vilken vårdmottagning du ska gå till. Du kan välja vårdmottagning i hela landet, oavsett var du är folkbokförd.',
          startDate: '2018-9-3 18:18:38',
          endDate: '2018-9-3 18:18:38',
        };

        var xxx1 = {
          title: 'Läkarbesök',
          location: 'BBB',
          notes: 'När du ska söka vård kan du själv välja vilken vårdmottagning du ska gå till. Du kan välja vårdmottagning i hela landet, oavsett var du är folkbokförd.',
          startDate: '2018-8-28 18:18:38',
          endDate: '2018-8-28 18:18:38',
        };


        this.eventList.push(xxxo);
        this.eventList.push(xxx1);

        this.eventList.push({
          title: 'Läkarbesök',
          location: 'RRRRR',
          notes: 'sworld',
          startDate: '2018-6-1 18:18:38',
          endDate: '2018-6-1 18:18:38',
        });
      }
    }, (error) => {
      console.log('add-events ERROR  GetAllPlans msg:' + error);
      console.log(error);
    })



    console.log(this.eventList);
    console.log('___________END2_____');

    //this.eventList.push(xoxo);

    var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    // console.log('-------dates-------');
    // console.log(startDate);
    // console.log(endDate);
    this.calendar.listEventsInRange(startDate, endDate).then(
      (msg) => {
        msg.forEach(item => {
          // console.log('loadEventThisMonth');
          // console.log(item);
          this.eventList.push(item);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  appendObjTo(thatArray, newObj) {
    const frozenObj = Object.freeze(newObj);
    return Object.freeze(thatArray.concat(frozenObj));
  }


  checkEvent(day) {
    var hasEvent = false;
    var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
    var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";

    // console.log('------home checkEvent(day)');
    // console.log(day);
    // console.log(thisDate1);
    // console.log(thisDate2);
    // console.log('--e----home checkEvent(day)');


    this.eventList.forEach(event => {
      // console.log('----event-');
      //   console.log(event);
      //   console.log('*----event-');
      if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
        hasEvent = true;
      }
    });
    return hasEvent;
  }



  selectDate(day) {
    this.isSelected = false;
    this.selectedEvent = new Array();
    var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
    var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";
    this.eventList.forEach(event => {
      if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
        this.isSelected = true;
        this.selectedEvent.push(event);
      }
    });
  }

  deleteEvent(evt) {
    // console.log(new Date(evt.startDate.replace(/\s/, 'T')));
    // console.log(new Date(evt.endDate.replace(/\s/, 'T')));
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure want to delete this event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(evt.startDate.replace(/\s/, 'T')), new Date(evt.endDate.replace(/\s/, 'T'))).then(
              (msg) => {
                console.log(msg);
                this.loadEventThisMonth();
                this.selectDate(new Date(evt.startDate.replace(/\s/, 'T')).getDate());
              },
              (err) => {
                console.log(err);
              }
            )
          }
        }
      ]
    });
    alert.present();
  }


  stpSelect() {
    console.log('STP selected');
  }

  testFABaction() {
    alert('fab action');
  }



  ionViewDidLoad() {


  }




  isIos() {
    return this.platform.is('ios');
  }


  openModal() {
    var questionNum = 1;
    switch (questionNum) {
      case 1:
        let modal = this.modalCtrl.create(Question1Page);
        modal.present();
        break;
      case 2:
        modal = this.modalCtrl.create(Question2Page);
        modal.present();
        break;
      case 3:
        modal = this.modalCtrl.create(Question3Page);
        modal.present();
        break;
      default:
        modal = this.modalCtrl.create(Question1Page);
        modal.present();

    }


    // let modal1 = this.modalCtrl.create(Question1Page, questionNum);
    // modal1.present();

    //alert("ss");
    /*
    const myModalOptions: ModalOptions ={
      enableBackdropDismiss:true
    };
  
    const myData = {
      name: 'Paul H',
      occupation: 'Dev'
    };
    const myModal = this.modalCtrl.create('ModalPage',{data:myData},myModalOptions);
    myModal.present();
  
    myModal.onDidDismiss((data) =>{
      console.log("I have dismissed");
      console.log(data);
    });
  
    myModal.onWillDismiss((data) =>{
      console.log("I'm about to dismiss");
      console.log(data);
    });
  */
  }


  openModalCoach() {
    let modal2 = this.modalCtrl.create(CoachPage);
    modal2.present();
  }

  openModalQ2() {
    let modal1 = this.modalCtrl.create(Question3Page);
    modal1.present();
  }

  openModalQ3() {
    let modal3 = this.modalCtrl.create(Question2Page);
    modal3.present();

  }
  openModalPerson() {
    // let modal = this.modalCtrl.create(PersonContentPage, questionNum);
    // modal.present(); 
  }

  dismiss() {
    //this.viewCtrl.dismiss();

    // this.navCtrl.swipeBackEnabled;
  }

  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'You have a question to answer. Tap in the bell :D',
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

  showLongToast() {
    let toast = this.toastCtrl.create({
      message: 'You have a question to answer',
      duration: 2000,
    });
    toast.present();
  }


  itemSelected(items: string) {
    //console.log("Selected Item", this.itemsdata);
    var ccc = items;
    console.log("Selected Item", ccc);
  }

}
