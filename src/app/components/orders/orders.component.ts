import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(public nav: NavService) { }

  ngOnInit() {
    this.nav.show();
  }


}
