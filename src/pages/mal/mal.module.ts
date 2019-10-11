import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MalPage } from './mal';

@NgModule({
  declarations: [
    MalPage,
  ],
  imports: [
    IonicPageModule.forChild(MalPage),
  ],
})
export class MalPageModule {}
