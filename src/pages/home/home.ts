import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, PopoverController, App, ModalController, FabContainer, ActionSheetController, Platform } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Question1Page } from '../question1/question1';
import { Question2Page } from '../question2/question2';
import { Question3Page } from '../question3/question3';
import { Vibration } from '@ionic-native/vibration';
import { Geolocation } from '@ionic-native/geolocation'
import { ActionSheetServiceProvider } from '../../providers/action-sheet-service/action-sheet-service';
import { ModalCoachIniPage } from '../modal-coach-ini/modal-coach-ini';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { NotificationsPage } from '../notifications/notifications';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  conferenceDate = '2047-05-17';
  array: number[] = [];

  public geolat: any;
  public geolng: any;

public arrayx: any;

public questiondata = [
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


  public minutes: number = 0;
  public secondes: number = 0;
  public totalSecondes: number = 0;
  public timer;

  public today: number = Date.now();

  planningPage: any;

  private existCurrentUser: boolean;
  private idCurrentUser: number;
  private existDefault3Questions: boolean;

  expenses: any = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;

  picToView: string = "../assets/img/cat1.png";

  private actionSheetData: any;

  private icocoach: any;

  public arraycoach = {};

  

  constructor(
    private geolocation: Geolocation,
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseProvider,
    private actionSheetSvc: ActionSheetServiceProvider,
    private vibration: Vibration,
    public popoverCtrl: PopoverController,
    public appCtrl: App,
    public modalCtrl: ModalController,
    private tabs: Tabs,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController

  ) {

    this.start();

    this.actionSheetData = [
      {
        text: 'Intro',
        handler: () => {
          console.log('Deletds clicked');
          this.openModalCoachIni();
          // this.review(data);
        }
      },
      {
        text: 'Rate',
        handler: () => {
          console.log('Delete clicked');

          // this.rate(shift);
        }
      },
    ];

    this.checkAnswers();



    // //    this.arraycoach =  this.database.GetCurrentCoach();
    //     console.log('____');
    //     //console.log('FULL   arraycoach_'+coach);
    //     this.arraycoach = this.database.fullarraycoach;
    //     console.log('XX Home page  arraycoach_'+this.arraycoach);

    //     this.iconCoach = this.database.iconCOach;
    //     console.log('XX Home page  arraycoach_'+this.database.iconCOach+'_'+this.iconCoach);

    this.getCoachData();

    this.testini();

  }

  //FUNCTIONS



  openModalCoachIni() {
    let modal = this.modalCtrl.create(ModalCoachIniPage);
    modal.present();
  }

  getCoachData() {

    // const xxx = this.database.GetAllCoaches();
    // xxx.then((datacc) => {
    //   this.arraycoach = datacc;
    //   console.log('datacc',datacc);
    //   console.log('array coach',this.arraycoach);
    // })
    // .catch(err => console.log('Error', err));


    const filenamex = this.database.GetFileNameCoach();
    filenamex.then((icofile) => {
      this.icocoach = icofile;
      this.picToView = "../assets/img/" + this.icocoach;
      console.log('icofileZ', icofile + ':' + this.icocoach);
    })
      .catch(err => console.log('Error file', err));


  }


  testini() {

    this.checkDefaultQuestions();
  }

  /*
  getAllCoachData() {
    this.database.GetAllCoaches.then((data) => {
      // console.log('add-events OK  GetAllPlans msg:');
      data;
       console.log(data);
    }, (error) => {
      console.log('add-events ERROR  GetAllPlans msg:' + error);
    })
  }
  */

  checkUsers() {
    this.database.GetCurrentUser();
    this.existCurrentUser = this.database.existsUser;
    if (!this.existCurrentUser) {
      console.log('the user does not exist...creating!');
      this.database.CreateNewUser('user', 'default@user.se', 1, 2, 3, 'f');
    } else {
      console.log('the user already exists!');
    }
    this.idCurrentUser = this.database.idUser;
  }


  checkAnswers(){
    // let arrayanswers = [];    
    this.arrayx =  this.database.GetAllAnswers();
    console.log('-******************************** ARRAY:', this.arrayx);
  }


  checkDefaultQuestions() {
    this.database.GetCurrentQuestions();
    this.existDefault3Questions = this.database.existsDefault3Questions;
    if (!this.existDefault3Questions) {
      //title TEXT, subtitle TEXT, content TEXT, type TEXT, category TEXT, notes TEXT, objective TEXT, maxlevel TEXT, minlevel TEXT, scale INTEGER, validstart TEXT, validend TEXT, id_users INTEGER

      this.database.CreateNewQuestionnaire('Hur har du sovit?', '', '', 'title', 'nu', 'nu0', '', '', '', 0, '', '', this.idCurrentUser);
      this.database.CreateNewQuestionnaire('', '', '', 'range', 'nu', 'nu1', '', 'Glad', 'Nedstämd', 6, '', '', this.idCurrentUser);
      this.database.CreateNewQuestionnaire('', '', '', 'range', 'nu', 'nu2', '', 'Lugn', 'Ängestfylld', 6, '', '', this.idCurrentUser);
      this.database.CreateNewQuestionnaire('', '', '', 'range', 'nu', 'nu3', '', 'Full av energi', 'Utmattad', 6, '', '', this.idCurrentUser);
      this.database.CreateNewQuestionnaire('', '', '', 'range', 'nu', 'nu4', '', 'Avspänd', 'Stressad', 6, '', '', this.idCurrentUser);

      this.database.CreateNewQuestionnaire('Skatta ansträngning, grad av aktivitet samt återhämtning', '', '', 'title', 'morgon', 'morgon0', '', '', '', 0, '', '', this.idCurrentUser);
      this.database.CreateNewQuestionnaire('Hur många timmar?', '(uppskattar antal timmar)', '', 'input', 'morgon', 'morgon1', '', '', '', 0, '', '', this.idCurrentUser);
      this.database.CreateNewQuestionnaire('Svårt att somna?', '', '', 'range', 'morgon', 'morgon2', '', 'mycket svårt', 'inte alls', 5, '', '', this.idCurrentUser);
      this.database.CreateNewQuestionnaire('Många uppvaknanden? ', '(uppskatta antalet uppvaknanden)', '', 'input', 'morgon', 'morgon3', '', '', '', 0, '', '', this.idCurrentUser);
      this.database.CreateNewQuestionnaire('Känner du dig utvilad?', '', '', 'range', 'morgon', 'morgon4', '', 'mycket utvilad', 'inte alls', 5, '', '', this.idCurrentUser);

      this.database.CreateNewQuestionnaire('Hur känner du dig just nu?', '', '', 'title', 'kväll', 'kvall0', '', '', '', 6, '', '', this.idCurrentUser);
      this.database.CreateNewQuestionnaire('', '', '', 'range', 'kväll', 'kvall1', '', 'Glad', 'Nedstämd', 6, '', '', this.idCurrentUser);
      this.database.CreateNewQuestionnaire('', '', '', 'range', 'kväll', 'kvall2', '', 'Lugn', 'Ångestfylld', 6, '', '', this.idCurrentUser);
      this.database.CreateNewQuestionnaire('', '', '', 'range', 'kväll', 'kvall3', '', 'Full av energi', 'Utmattad', 6, '', '', this.idCurrentUser);
      this.database.CreateNewQuestionnaire('', '', '', 'range', 'kväll', 'kvall4', '', 'Avspänd', 'Stressad', 6, '', '', this.idCurrentUser);

    }


  }


  tempDeleteButton() {
    this.database.DeleteUsersInformation();
  }

  ngAfterViewInit() {
    // Here 'my-content' is the ID of my ion-content
    //var content = this.appCtrl.get;// .getComponent('my-tab');
    //console.log("Yo we get the tab", content);
  }

  ionViewDidLoad() {
    //this.navCtrl.push(this.planningPage);

    this.geolocation.getCurrentPosition().then(pos => {
      this.geolat = pos.coords.latitude;
      this.geolng = pos.coords.longitude;
      console.log('HOME COOR:', this.geolat + ':' + this.geolng);

    }).catch(err => console.log(err))
  }

  add() {
    this.array.push(1);
  }

  clickMainFAB() {
    console.log('Clicked open social menu');
  }

  openSocial(network: string, fab: FabContainer) {
    console.log('Share in ' + network);
    fab.close();
  }

  //   ngOnInit() {
  //     // Let's navigate from TabsPage to Page1
  //     this.nav.push(this.homePage);
  //  }

  goPlanneringPage() {

    var alltabs = this.tabs.getAllChildNavs();
    console.log('these are the tabas:', alltabs);
    this.tabs.select(1);

    /*** IT WOKS!!
        var xp = this.navCtrl.last();
        console.log('last page:',xp);
        this.navCtrl.push(this.homePage);
    ***/
  }

  goNowPage() {

    this.tabs.select(2);

    /*** IT WOKS!!
        var xp = this.navCtrl.last();
        console.log('last page:',xp);
        this.navCtrl.push(this.homePage);
    ***/
  }

  goAktivityPage() {
    this.tabs.select(2);
  }

  goGoalPage() {
    this.tabs.select(3);
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

  


  // presentPopover(event: Event) {
  //   let popover = this.popoverCtrl.create(PopoverPage);
  //   popover.present({ ev: event });
  // }

  openNotifications() {



    const popover = this.popoverCtrl.create(NotificationsPage);
    popover.present();
  }

  openCoach() {

    this.vibration.vibrate(2300);
    //this.tabs.select(0);

    this.actionSheetSvc.present(this.actionSheetData);
    /*
    this.actionSheetSvc.present([
      {
        text: 'Review',
        handler: () => {
          console.log('Deletds clicked');
  
          // this.review(data);
        }
      },
      {
        text: 'Rate',
        handler: () => {
          console.log('Delete clicked');
  
          // this.rate(shift);
        }
      },
    ]);
    */

    //this.presentActionSheet();
  }

  presentActionSheet() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Coach actions',
      subTitle: 'Science is what you know, philosophy is what you dont know',
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



  emergency_button() {
    console.log('emergency button');
    //this.pagina.tabHide(8);
  }

  vibrate() {
    this.vibration.vibrate(1000);
  }


  checkUser() {
    console.log(' \t (OK) creating a new user');
    this.database.CreateUser("user", "user@se", 30, 60, 90, "x").then((data) => {
      //alert(data);
      console.log('data from creating a user:', data);
    }, (error) => {
      console.log(error);
    })

    console.log(' \t (OK) checking new user');
    this.database.GetAllUsers().then((dataret) => {
      console.log('data from checking all users', dataret);
    }, (error) => {
      console.log(error);
    })
  }

  /* TIME */
  setMorgon() {
    var timeInMs = Date.now();
    var today = new Date();
    // today.setDate(today.getTime() + 24 * 60 * 60 * 1000);
    today.setHours(7+24);
    today.setMinutes(0);
    // today.setTime(11);
    console.log('\t\t ######s# SET MORGON', today);
    console.log('\t\t ####### SET MORGON2', timeInMs);
  }

  start() {
    this.setMorgon();

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
