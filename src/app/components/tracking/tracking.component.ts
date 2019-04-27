/// <reference path="./../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { AgmCoreModule, MapsAPILoader } from "@agm/core";

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})

export class TrackingComponent implements OnInit {
  mexicoCity = null
  jacksonville = null

  // Warehouse 1 { lat: 37.3047208, lng: -121.862952 }
  // Warehouse 2 { lat: 37.3346377, lng: -121.9819636 }

  lat: Number = 37.3047208;
  lng: Number = -121.862952;
  origin = { lat: 37.3047208, lng: -121.862952 }
  destination = { lat: 37.338888, lng: -121.881553 }
  waypoints: object = [
    {
        location: { lat: 37.3346377, lng: -121.9819636 },
        stopover: true,
    },
  ]

  constructor(private mapsAPILoader: MapsAPILoader) {
    this.mapsAPILoader.load().then(() => {
      this.mexicoCity = new google.maps.LatLng(19.432608, -99.133209);
      this.jacksonville = new google.maps.LatLng(40.730610, -73.935242);
    });
  }

  ngOnInit() {
    console.log(this.calculateDistance());
  }

  calculateDistance() {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(this.mexicoCity, this.jacksonville);
    return distance;
  }
}
