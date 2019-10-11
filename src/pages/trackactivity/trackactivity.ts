import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Platform } from 'ionic-angular';
import { TrackDataProvider } from '../../providers/track-data/track-data';

/**
 * Generated class for the TrackactivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;


@IonicPage()
@Component({
  selector: 'page-trackactivity',
  templateUrl: 'trackactivity.html',
})
export class TrackactivityPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public platform: Platform, public trackData: TrackDataProvider) {
  }

  XionViewDidLoad() {

    this.trackData.getMap().subscribe((mapData: any) => {
      let mapEle = this.mapElement.nativeElement;

      let map = new google.maps.Map(mapEle, {
        center: mapData.find((d: any) => d.center),
        zoom: 16
      });

      mapData.forEach((markerData: any) => {
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        let marker = new google.maps.Marker({
          position: markerData,
          map: map,
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      google.maps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });

    });

}


}
