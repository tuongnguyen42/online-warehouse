import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:[Object];
  totalPrice:any;
  totalWeight:any;
  emptyCart:any;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private cartService: CartService

  ) { }

  ngOnInit() {
    // localStorage.clear();
    this.emptyCart = (JSON.parse(localStorage.getItem('cart')).length === 0);
    let cart = JSON.parse(localStorage.getItem('cart'));
    let totalPrice:number = 0;
    let totalWeight:number = 0;
    this.cart = cart;
    console.log(cart);

    for(let i = 0; i < cart.length; i++){
      totalPrice += parseFloat(cart[i].price);
      totalWeight += parseFloat(cart[i].weight);
    }


    this.totalPrice = parseFloat(totalPrice.toFixed(2));
    this.totalWeight = parseFloat(totalWeight.toFixed(2));

    this.cartService.setTotalPrice(this.totalPrice);
    this.cartService.setTotalWeight(this.totalWeight);





  }

  deleteItem(product){

    let temp = JSON.parse(localStorage.getItem('cart'));
    let index = temp.findIndex(temp => temp.name === product.name);

    temp.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(temp));
    this.totalPrice = this.totalPrice - product.price;
    this.totalWeight = this.totalWeight - product.weight;
    this.cartService.setTotalPrice(this.totalPrice);
    this.cartService.setTotalWeight(this.totalWeight);
    location.reload();
  }

  updateItem(product){
    let temp = JSON.parse(localStorage.getItem('cart'));
    let index = temp.findIndex(temp => temp.name === product.name);
    let updatedQty = parseFloat((<HTMLInputElement>document.getElementById("qtyUpdate"+index)).value);
    console.log(updatedQty);

    if (updatedQty > temp[index].stock){
      this.flashMessage.show("Out of stock!  Only " + temp[index].stock + " available.",{
        cssClass: 'alert-danger',
        timeout: 3000});
      // document.getElementById("qtyUpdate").innerHTML = temp[index].stock;
      // location.reload();
    } else{
      let updatedWeight = temp[index].weight/temp[index].qty*updatedQty;
      let updatedPrice = temp[index].price/temp[index].qty*updatedQty;
      temp[index].qty=updatedQty;
      temp[index].price=updatedPrice.toFixed(2);
      temp[index].weight=updatedWeight.toFixed(2);
      this.totalPrice = updatedPrice.toFixed(2);
      this.totalWeight = updatedWeight.toFixed(2);
      this.cartService.setTotalPrice(this.totalPrice);
      this.cartService.setTotalWeight(this.totalWeight);

      localStorage.setItem('cart', JSON.stringify(temp));
      location.reload();
    }

  }





}
