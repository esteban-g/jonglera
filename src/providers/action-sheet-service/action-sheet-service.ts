import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';

/*
  Generated class for the ActionSheetServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActionSheetServiceProvider {

  constructor(
    public http: HttpClient,
    public actionSheetCtrl: ActionSheetController
  ) {
    console.log('Hello ActionSheetServiceProvider Provider');
  }


  present(buttons: Array<any>) {
    buttons.push({
      text: 'Cancel',
      role: 'cancel',
    });

    let actionSheet = this.actionSheetCtrl.create({
      buttons: buttons
    });

    actionSheet.present();
  }

}
