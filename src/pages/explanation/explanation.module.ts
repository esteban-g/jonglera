import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExplanationPage } from './explanation';

@NgModule({
  declarations: [
    ExplanationPage,
  ],
  imports: [
    IonicPageModule.forChild(ExplanationPage),
  ],
})
export class ExplanationPageModule {}
