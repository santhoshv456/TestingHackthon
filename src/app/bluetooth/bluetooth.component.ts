/// <reference types="web-bluetooth" />
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.component.html',
  styleUrls: ['./bluetooth.component.css']
})
export class BluetoothComponent implements OnInit {
  
  options: any = {};

  constructor() { }

  ngOnInit() {
  } 


  getDevices()
  {
    console.log("Searching..");
    this.options.acceptAllDevices = true;
    navigator.bluetooth.requestDevice(this.options)
    .then(device => {
      console.log('> Name:             ' + device.name);
      console.log('> Id:               ' + device.id);
      console.log('> Connected:        ' + device.gatt.connected);
    })
    .catch(error => {
      console.log('Argh! ' + error);
    });
  }


}
