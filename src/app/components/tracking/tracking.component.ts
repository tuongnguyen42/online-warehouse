import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})

export class TrackingComponent implements OnInit {
  // Warehouse 1
  latitude = 37.3047208;
  longitude = -121.862952;
  mapType = 'roadmap';

  constructor() { }

  ngOnInit() {
  }
}
