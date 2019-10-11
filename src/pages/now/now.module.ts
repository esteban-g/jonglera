import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NowPage } from './now';

@NgModule({
  declarations: [
    NowPage,
  ],
  imports: [
    IonicPageModule.forChild(NowPage),
  ],
})
export class NowPageModule {}
