import {
    band
} from './miband';
'use strict';

let btn = document.getElementsByTagName('button')[0];
btn.addEventListener('click', init);
const BATTERY_LEVEL = '00000006-0000-3512-2118-0009af100700';
function init() {
    navigator.bluetooth.requestDevice({
            filters: [{
                services: [0xFEE0]
            }]
        })
        .then(device =>
          {
            console.log("Found device successfully");
            device.addEventListener('gattserverdisconnected',console.log('disconnect'));
            return device.gatt.connect()
          })
        .then (server => {
          console.log("Connected successfully")
          console.log(server.getPrimaryService(0xFEE0));
          return server.getPrimaryService(0xFEE0);
        })
        .then(service => {
            // Getting Battery Level Characteristic...
            console.dir(service);
            return service.getCharacteristic(0xFF01);
        })
        .then(characteristic => {
            // Reading Battery Level...
            console.log('bbiubiubibiubibi');
            return characteristic.readValue();
        })
        .then(value => {
            console.log('Battery percentage is ' + value.getUint8(0));
        })
        .catch(error => {
            console.log(error);
        });
}
