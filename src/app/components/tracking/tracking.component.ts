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
  estimatedDelivery: Date;
  displayDate: String;
  origin = { lat: 37.3047208, lng: -121.8216308 };
  destination = { lat: 37.35853300000001, lng: -121.862952 };
  lat: Number;
  lng: Number;
  status:any;

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
      this.estimatedDelivery = new Date(this.trackingResult.purchase_time);
      this.estimatedDelivery.setDate(this.estimatedDelivery.getDate() + 2);
      this.displayDate = this.estimatedDelivery.toDateString();
      this.status = this.trackingResult.delivery_status;
      this.destination = { lat: +this.trackingResult.lat, lng: +this.trackingResult.lng };
    })

  }
}
