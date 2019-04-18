import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import {SearchService} from '../../services/search.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId:String = "";
  productResult:Object;


  constructor(
    private searchService:SearchService,
    private route:Router,
    private router:ActivatedRoute
  ) { }

  ngOnInit(){

    this.router.queryParams.subscribe(params => {
    this.productId = params['inventory_id'];
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  });


    const query = {
      productId:this.productId
    }
    this.searchService.searchItem(query).subscribe(data =>{
      this.productResult = data.item;
      console.log(this.productResult);
    })

  }
}
