import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { OrdersService } from '../../services/orders.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  id: Number = null;
  searchResult:[Object];

  constructor(public nav: NavService,
    private ordersService: OrdersService,
    private route: Router,
    private router: ActivatedRoute) { }

  ngOnInit() {
      this.router.queryParams.subscribe(params => {
      this.id = params['id'];
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    });

    this.ordersService.searchUser().subscribe(data =>{
      this.searchResult = data.orders;
      // console.log(this.searchResult);
    })
  }


}
