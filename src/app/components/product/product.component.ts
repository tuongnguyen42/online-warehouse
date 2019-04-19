import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import {SearchService} from '../../services/search.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {CartService} from '../../services/cart.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId:String = "";
  productResult:Object = {
    name:"",
    id:"",
    description:"",
    price:0,
    stock:0,
    weight:0

  };

  qty:number = 1;
  stock:number;

  constructor(
    private searchService:SearchService,
    private route:Router,
    private router:ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private cartService:CartService
  ) { }

  ngOnInit(){

    this.router.queryParams.subscribe(params => {
    this.productId = params['id'];

  });


    const query = {
      productId:this.productId
    }
    this.searchService.searchItem(query).subscribe(data =>{
      this.productResult = data.item;
      this.stock = data.item.stock;
    })

  }

  onAddClick(){
    if(this.qty > this.stock){
      this.flashMessage.show("Out of stock!",{
        cssClass: 'alert-danger',
        timeout: 3000});
    } else{
      this.stock = this.stock-1;
      this.flashMessage.show("Added to cart!",{
        cssClass: 'alert-success',
        timeout: 3000});
      this.cartService.addToCart(this.productResult, this.qty);
    }





  }




}
