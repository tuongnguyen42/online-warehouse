import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:[Object];
  totalPrice:number = 0;
  totalWeight:number = 0;

  constructor() { }

  ngOnInit() {
    // localStorage.clear();
    let cart = JSON.parse(localStorage.getItem('cart'));
    let totalPrice = 0;
    let totalWeight = 0;
    this.cart = cart;
    console.log(cart);

    for(let i = 0; i < cart.length; i++){
      totalPrice += parseFloat(cart[i].price);
      totalWeight += parseFloat(cart[i].weight);
    }

    this.totalPrice = parseFloat(totalPrice).toFixed(2);
    this.totalWeight = parseFloat(totalWeight).toFixed(2);



  }

  deleteItem(product){

    let temp = JSON.parse(localStorage.getItem('cart'));
    let index = temp.findIndex(temp => temp.name === product.name);

    temp.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(temp));
    this.totalPrice = this.totalPrice - product.price;
    this.totalWeight = this.totalWeight - product.weight;
    location.reload();
  }

  updateItem(product){
    let temp = JSON.parse(localStorage.getItem('cart'));
    let index = temp.findIndex(temp => temp.name === product.name);
    console.log(index);
    let updatedQty =document.getElementById("qtyUpdate").value;
    let updatedWeight = temp[index].weight/temp[index].qty*updatedQty;
    let updatedPrice = temp[index].price/temp[index].qty*updatedQty;
    temp[index].qty=updatedQty;
    temp[index].price=updatedPrice.toFixed(2);
    temp[index].weight=updatedWeight.toFixed(2);

    localStorage.setItem('cart', JSON.stringify(temp));
    location.reload();
  }





}
