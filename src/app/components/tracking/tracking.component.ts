import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from "@agm/core";
import { TrackingService } from '../../services/tracking.service';
import { OrdersService } from '../../services/orders.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})

export class TrackingComponent implements OnInit {
  orderId:String = "";
  trackingResult:Object[];

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

  constructor(
    private ordersService:OrdersService,
    private route:Router,
    private router:ActivatedRoute,
  ) {
    
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
    this.orderId = params['id'];
  });
    const query = {
      orderId:this.orderId
    }
    this.ordersService.searchOrder(query).subscribe(data =>{
      this.trackingResult = data.trackingResult;
      console.log(this.trackingResult);
    })
  }
}
