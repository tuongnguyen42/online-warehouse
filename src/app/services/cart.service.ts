import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private http:Http) { }


  setTotalWeight(weight){
    localStorage.setItem('weight', weight);
  }

  getTotalWeight(){
    return parseFloat(localStorage.getItem('weight'));
  }

  setTotalPrice(price){
    localStorage.setItem('price', price);
  }
  getTotalPrice(){
    return parseFloat(localStorage.getItem('price'));
  }


  placeOrder(order){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/payment', order,{headers: headers})
    .pipe(map(res => res.json()));
  }


  addToCart(product, qty){
    if(localStorage.getItem('cart') == null){
      let price = product.price*qty;
      let weight = product.weight*qty;
      const temp = [{
        name:product.name,
        item_id: product.id,
        price:price,
        weight:weight,
        description:product.descriptionq,
        stock:product.stock,
        qty:qty
      }]

      localStorage.setItem('cart', JSON.stringify(temp));
    }
    else{
      //get cart out of localstorage and parse to json
      let temp = JSON.parse(localStorage.getItem('cart'));

      //if item exist in cart
      if(temp.some(temp => temp.item_id === product.id)){
        let index = temp.findIndex(temp => temp.item_id === product.id);
        let newQty = parseInt(temp[index].qty) + parseInt(qty);
        let newPrice = (product.price*newQty).toFixed(2);
        let newWeight = (product.weight*newQty).toFixed(2);
        temp[index].qty = newQty;
        temp[index].price = newPrice;
        temp[index].weight = newWeight;
        localStorage.setItem('cart', JSON.stringify(temp));


      } else{
        let price = (product.price*qty);
        price = parseFloat(price.toFixed(2));
        let weight = product.weight*qty;
        weight = parseFloat(weight.toFixed(2));
        const item ={
          name:product.name,
          item_id: product.id,
          price:price,
          weight:weight,
          description:product.description,
          stock:product.stock,
          qty:qty
        }
        temp.push(item);
        localStorage.setItem('cart', JSON.stringify(temp));
      }
    }
  }


}
