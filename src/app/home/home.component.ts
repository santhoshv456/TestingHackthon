import { Component, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { LocationService } from '../_services/location.service';
import { Payload } from '../_models/payload';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  studentId: string ;

  schoolMsg: any = {};

  transMsg: any = {};

  homeMsg: any = {};

  student: any = {};

  schoolPostion = {
    lat: 18.768840,
    long: 84.413040
  };

  transformerPostion = {
    lat: 18.756701,
    long: 84.422302
  }

  homePostion = {
    lat: 18.731279,
    long: 84.355469
  }

  @ViewChild('map', { static: true }) public mapElement: any;

  map: google.maps.Map;

  marker: google.maps.Marker;


  constructor(private location: LocationService) {
  }


  ngOnInit() {

    //this.calculateDistance();
    interval(1000 * 30).subscribe(x => {
      this.calculateDistance();
    });
  }


  findStudent() {
    console.log(this.studentId);
    let lat: any;
    let long: any
    const mapProperties = {
      center: new google.maps.LatLng(20.5937, 78.9629),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.location.getStudentLoacation(this.studentId).subscribe((x: any) => {
      console.log(x);
        this.showStudentPosition(x.studentCurrentLoc_Lat,x.studentCurrentLoc_Lon);
    });
  }

  calculateDistance() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

       let data= {
          "studemtMaster":
          {
          "studentId":1234,
          "studentName":"Santosh",
          "class":"XII",
          "sex":"M",
          "baseLocation_Lat":34.0000000,
          "baseLocation_Lon":44.0000000,
          "deviceCode":"23456"
          }
          ,
          "studentCurrentId":0,
          "studentId":1234,
          "studentCurrentLoc_Lat":position.coords.latitude,
          "studentCurrentLoc_Lon":position.coords.longitude,
          "lastUpdatedTime":new Date().toJSON("yyyy/MM/dd HH:mm")
          }
         

        this.location.sendDistance(data).subscribe(x=> {
          console.log(x);
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


  showPosition(position) {
    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      console.log(this.marker);
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  showStudentPosition(lat,long) {
    this.marker = null;
    let location = new google.maps.LatLng(lat,long);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  distance(lat1: number, lon1: number, lat2: number, lon2: number, unit: string) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
      var dLon = this.deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d;
    }
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
}
