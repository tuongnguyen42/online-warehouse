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
  trackingResult:Object = {
    tracking_id:0,
    order_id:0,
    origin:0,
    stopover:false,
    address:"",
    city:"",
    state:"",
    zip:0,
    delivery_method:"",
    delivery_status:""
  };
  origin = { lat: 0, lng: 0 };
  destination = { lat: 0, lng: 0 };
  lat: Number;
  lng: Number;
  waypoints: object = [
  ]

  constructor(
    private ordersService:OrdersService,
    private trackingService:TrackingService,
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
      console.log(this.trackingResult[0].origin);

      // Change this to query from database in future
      if (this.trackingResult[0].origin == 1) {
        // Warehouse 1
        console.log("the origin is warehouse1");
        this.lat = 37.3047208;
        this.lng = -121.862952;
        this.origin = { lat: 37.3047208, lng: -121.862952 };
      }
      else {
        // Warehouse 2
        console.log("the origin is warehouse2");
        this.lat = 37.3346377;
        this.lng = -121.9819636;
        this.origin = { lat: 37.3346377, lng: -121.9819636 };
      }

      // Set the stopover to be the non-origin warehouse
      if (this.trackingResult[0].stopover == true) {
        if (this.trackingResult[0].origin == 1) {
          // Warehouse 2
          console.log("the stopover is warehouse2");
          this.waypoints = [
            {
                location: { lat: 37.3346377, lng: -121.9819636 },
                stopover: true,
            },
          ]
        }
        else {
          // Warehouse 1
          console.log("the stopover is warehouse1");
          this.waypoints = [
            {
                location: { lat: 37.3047208, lng: -121.862952 },
                stopover: true,
            },
          ]
        }
      }

      this.destination = { lat: 37.338888, lng: -121.881553 };
    })

  }
}
