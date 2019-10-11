import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule, Popover } from 'ionic-angular';


import { Vibration } from '@ionic-native/vibration';
import { Calendar } from '@ionic-native/calendar';
import { Geolocation } from '@ionic-native/geolocation';

import { Items } from '../mocks/providers/items';
import { Settings, Api } from '../providers';
import { MyApp } from './app.component';
import { DatabaseProvider } from '../providers/database/database';
import { Question1Page } from '../pages/question1/question1';
import { Question2Page } from '../pages/question2/question2';
import { Question3Page } from '../pages/question3/question3';
import { AddEventPage } from '../pages/add-event/add-event';
import { SQLite } from '@ionic-native/sqlite';
import { TrackDataProvider } from '../providers/track-data/track-data';
// import { UserDataProvider } from '../providers/user-data/user-data';

import { JongleraDataProvider } from '../providers/jonglera-data/jonglera-data';
//import { TwoDigitPipe } from '../pipes/two-digit/two-digit';
import { CoachDataProvider } from '../providers/coach-data/coach-data';
import { LoginmodalPage } from '../pages/loginmodal/loginmodal';
import { ActionSheetServiceProvider } from '../providers/action-sheet-service/action-sheet-service';
import { ModalCoachIniPage } from '../pages/modal-coach-ini/modal-coach-ini';
import { NotificationsPage } from '../pages/notifications/notifications';
import { PopoverPage } from '../pages/popover/popover';
import { TooltipsModule } from 'ionic-tooltips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExplanationPage } from '../pages/explanation/explanation';

import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { PopoverspeechPage } from '../pages/popoverspeech/popoverspeech';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    Question1Page,
    Question2Page,
    Question3Page,
    PopoverPage,
    PopoverspeechPage,
    ExplanationPage,
    ModalCoachIniPage,
    NotificationsPage,
    LoginmodalPage,
    AddEventPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TooltipsModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Question1Page,
    Question2Page,
    Question3Page,
    ModalCoachIniPage,
    PopoverPage,
    PopoverspeechPage,
    ExplanationPage,
    NotificationsPage,
    LoginmodalPage,
    AddEventPage
  ],
  providers: [
    Api,
    HttpClient,
    Items,
    SQLite,
    Vibration,    
    Camera,
    SpeechRecognition,
    Calendar,
        SplashScreen,
    StatusBar,
    Geolocation,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DatabaseProvider,
    TrackDataProvider,
    JongleraDataProvider,
    CoachDataProvider,
    ActionSheetServiceProvider
  ]
})
export class AppModule { }
