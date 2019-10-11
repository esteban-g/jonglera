import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, ModalController, Platform } from 'ionic-angular';

import { MainPage } from '../';
import { LoginmodalPage } from '../loginmodal/loginmodal';
import { DatabaseProvider } from '../../providers/database/database';




/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  brightness: number = 20;
  contrast: number = 0;
  warmth: number = 1300;
  messag: number = 1300;
  hotness: number = 1300;
  structure: any = { lower: 33, upper: 60 };
text: number = 0;

  public coachSel: any;
  public coachSelImg: any;
  public selectorw: number;

  isAndroid: boolean = false;

  constructor(public navCtrl: NavController,
    private database: DatabaseProvider,
    public modalCtrl: ModalController,
    platform: Platform,
    public toastCtrl: ToastController) {

    this.isAndroid = platform.is('android');
    this.addDefaults();

  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup(selectorw) {
    // this.navCtrl.push('SignupPage');

    if (selectorw == 1) {
      this.coachSel = "Totoro";
      this.coachSelImg = "c1.png";
    } else if (selectorw == 2) {
      this.coachSel = "Mimiko";
      this.coachSelImg = "c2.png";
    } else if (selectorw == 3) {
      this.coachSel = "Haku";
      this.coachSelImg = "c3.png";
    } else if (selectorw == 4) {
      this.coachSel = "Chihiro";
      this.coachSelImg = "c4.png";
    } else if (selectorw == 5) {
      this.coachSel = "Roboto";
      this.coachSelImg = "c5.png";
    }

    this.database.CreateNewCoach(this.coachSel, "", this.coachSelImg, this.selectorw);

    const toast = this.toastCtrl.create({
      message: 'Your coach is ' + this.coachSel+'. You may change your coach at anytime!',
      duration: 3000,
      position: 'top'
    });
    toast.present();

    //GUARDAR EN LA BASE DE DATOS EL COACH SELECCIONADO


    this.navCtrl.push(MainPage);

  }


  addDefaults() {
    this.database.CreateNewUser("user1", "", 30, 120, 80, "");
  }

  /*
  
    addSelectedCoach() {
      this.database.AddActivity("running", "indoor", "performance", 0, "precondition", "postcondition", "DATESTART", "DATEEND", 100, 1).then((data) => {
        alert(data);
        console.log('home.ts addDefaultActivties() OK');
        console.log(data);
      }, (error) => {
        console.log('home.ts addDefaultActivties() ERROR');
        console.log(error);
      })
    }
  
  */
  openModal() {

    let modal = this.modalCtrl.create(LoginmodalPage);
    modal.present();
  }



}
