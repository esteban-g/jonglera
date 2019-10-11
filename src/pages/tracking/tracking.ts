import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker,
  GoogleMapsEvent
} from '@ionic-native/google-maps';

import { TimerComponent } from '../../components/timer/timer';
import { StateComponent } from '../../components/state/state';

// import {TwoDigitPipe} from '../../pipes/two-digit/two-digit';

/**

  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  MarkerOptions,
  Marker

 */


/**
 * Generated class for the TrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// declare const google;

@IonicPage()

@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage {

  public lat: any;
  public lng: any;
  public clocky: any;
  extravar: any;
  starttime: any;


  public timer: TimerComponent = new TimerComponent();
  public state: StateComponent = new StateComponent();
  public btnPlay: string = 'START';


  items = [

    'Alpine Skiing',
    'Biathlon',
    'Bobsleigh',
    'Cross Country Skiing',
    'Curling',
    'Figure skating',
    'Freestyle Skiing',
    'Ice Hockey',
    'Luge',
    'Nordic Combined',
    'Short Track Speed Skating',
    'Skeleton',
    'Ski Jumping',
    'Snowboard',
    'Speed skating',
    'Archery',
    'Athletics',
    'Badminton',
    'Basketball',
    'Beach Volleyball',
    'Boxing',
    'Canoe Slalom',
    'Canoe Sprint',
    'Cycling BMX',
    'Cycling Mountain Bike',
    'Cycling Road',
    'Cycling Track',
    'Diving',
    'Equestrian / Dressage',
    'Equestrian Eventing',
    'Equestrian Jumping',
    'Fencing',
    'Football',
    'Golf',
    'Gymnastics Artistic',
    'Gymnastics Rhythmic',
    'Handball',
    'Hockey',
    'Judo',
    'Marathon Swimming',
    'Modern Pentathlon',
    'Rowing',
    'Rugby',
    'Sailing',
    'Shooting',
    'Swimming',
    'Synchronized Swimming',
    'Table Tennis',
    'Taekwondo',
    'Tennis',
    'Trampoline',
    'Triathlon',
    'Volleyball',
    'Water Polo',
    'Weightlifting',
    'Wrestling Freestyle',
    'Wrestling Greco-Roman'
  ];

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }
  gender: string = "f";

  zone = {
    kind: 'key2'
  }
  modeKeys = [
    'key1',
    'key2',
    'key3',
    'key4',
  ]

  public clocksec: any;
  public clockmin: any;
  public clockhour: any;
  public clockt: any;


  // @ViewChild('map') mapContainer: ElementRef;
  // @ViewChild('mapCanvas') mapElement: ElementRef;
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('start') startElement: ElementRef;
  @ViewChild('stop') stopElement: ElementRef;
  @ViewChild('clear') clearElement: ElementRef;




  map: GoogleMap;
  constructor(
    private geolocation: Geolocation,
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    let d = new Date();
    this.starttime = d;
    this.clocksec = 0;
    this.clockmin = 0;
    this.clockhour = 0;

    //this.starttime = 0.00;
  }




  play() {
    this.timer.start();
    this.state.setPlay();
    this.btnPlay = 'CONTINUE';
  }

  stop() {
    this.timer.stop();
    this.state.setStop();
  }

  backward() {
    this.timer.reset();
    this.state.setBackward();
    this.btnPlay = 'START';
  }


  starttimex() {
    setTimeout(function () {
      alert('dd');
    }, 1000)
  }

  startButton() {

    this.clocky = setInterval(this.myTimer, 1000);

    // this.starttime = this.getFormatedTime( "2017-01-19 10:34:36");
    this.getFormatedTime(new Date());
  }





  getFormatedTime(dateString) {

    let watch = this.geolocation.watchPosition();


    watch.subscribe((data) => {
      console.log('watch.subscribe((data) =');
      console.log(data);
      var x = data.coords.latitude;
      var y = data.coords.longitude;

      // var date = new Date(dateString);
      // var date = new Date(dateString);
      // var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      // var am_pm = date.getHours() >= 12 ? "pm" : "am";
      // var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      // var seconds = date.getSeconds();
      // let time = hours + ":" + minutes + " " + am_pm;
      // console.log('--ttt----');
      // console.log(date);
      // console.log(hours);
      // console.log(minutes);
      // console.log(time);
      // console.log(seconds);

      console.log('---xxx---');
      console.log('LAAA');
      console.log(x);
      console.log('LOOO');
      console.log(y);

      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });

    var date = new Date(dateString);
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "pm" : "am";
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds();
    let time = hours + ":" + minutes + " " + am_pm;

    console.log('--ttt----');
    console.log(date);
    console.log(hours);
    console.log(minutes);
    console.log(time);
    console.log(seconds);

    // console.log('---xxx---');
    return time;
  }


  ionViewDidLoad() {
    // console.console.log(this.mapElement);

    this.geolocation.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      console.log('COOR:', pos.coords.latitude + '_' + pos.coords.longitude);

    }).catch(err => console.log(err))

    console.log('coord:');

    /*
        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
          console.log(data);
          var x = data.coords.latitude;
          var y = data.coords.longitude;
    
    
          console.log('LAAA');
          console.log(x);
          console.log('LOOO');
          console.log(y);
    
          // data can be a set of coordinates, or an error (if an error occurred).
          // data.coords.latitude
          // data.coords.longitude
        });
    */
    // start my map

    // let posMaceio = { lat: -9.648139, lng: -35.717239 }
    // this.map = new google.maps.Map(this.mapElement.nativeElement, {
    //   zoom: 8,
    //   center: posMaceio,
    //   mapTypeId: 'roadmap'
    // });
    // this.map.setCenter(posMaceio);
    this.loadMap();




  }

  showMap() {
    //const location = new google.maps.

  }







  myTimer() {

    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
  }



  loadMap() {

    //  var coolat = this.lat;
    //  var coolng = this.lng;


    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 63.8203872,
          lng: 20.3072498
        },
        zoom: 15,
        tilt: 30
      }
    };

    // let mapOptions: GoogleMapOptions = {
    //   camera: {
    //     target: {
    // lat: 63.8203872,
    // lng: 20.3072498
    //     },
    //     zoom: 18,
    //     tilt: 30
    //   }
    // };




    // this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.map = GoogleMaps.create('mapcanvas', mapOptions);


    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 63.8203872,
        lng: 20.3072498
      }
    });


    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });



  }

}
