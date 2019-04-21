import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {CartService} from '../../services/cart.service';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  name:String;
  email:String;
  address: String;
  city: String;
  state: String;
  zip:String;


  emptyCart:Boolean;
  pickup:Boolean = false;
  truckDelivery:Boolean = true;
  deliveryChoice:Boolean = false;
  sameDayDelivery:Boolean = false;

  price:any;
  shippingCost:any = 0;
  tax:any;
  subtotal:any;
  total:any;
  weight:any;
  totalBeforeTax: any;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.emptyCart = (JSON.parse(localStorage.getItem('cart')).length === 0);
    if(!this.emptyCart){
      if(localStorage.getItem('shippingInfo')){
        let shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
        this.name = shippingInfo.name;
        this.email = shippingInfo.email;
        this.address = shippingInfo.address;
        this.city = shippingInfo.city;
        this.state = shippingInfo.state;
        this.zip = shippingInfo.zip;
      }
      this.price = this.cartService.getTotalPrice();
      this.weight = this.cartService.getTotalWeight();
      this.pickup = (localStorage.getItem('pickup') === 'true');
      this.sameDayDelivery = (localStorage.getItem('delivery') === 'true');






      if(!this.pickup){
        //free delivery for orders over 100
        if(this.price > 100){
          this.shippingCost = 0;
          if(this.sameDayDelivery){
            this.shippingCost = 25.00;
          }
        }
        //orders over 100 and less than 15lbs is free delivery by drone
        if(this.price > 100 && this.weight < 15){
          this.shippingCost = 0.00;
          this.truckDelivery = false;
        }

        //if order is under 100 can request delivery method
        if(this.price < 100){
          this.deliveryChoice = true;
            this.shippingCost = 20;
        }

      }
      this.totalBeforeTax = (this.shippingCost+this.price);
      this.tax = ((this.shippingCost+this.price)*.075).toFixed(2);
      this.total = (parseFloat(this.tax)+parseFloat(this.totalBeforeTax)).toFixed(2);


    }
    }



  //  It has a pickup area for customer to pick up their prepaid orders made online.
  //  It offers free delivery services for any orders over $100.00.
  //  For any orders that are less than 15lbs, the delivery will be done by a drone on the same day during business hours.
  //  Otherwise the orders will be delivered by delivery truck within 2 business days.
  //  For any order that are under $100, customer can request deliveries (drone or truck) by paying a surcharge of $20.
  //  For same day truck delivery of orders over $100, customer can pay a surcharge of $25.

  showDeliveryOptions(){
    return (this.price > 100);
  }
  onOrderPlace(){

  }

  pickupCheck(event: any){
   localStorage.setItem('pickup', String(this.pickup));

   let shippingInfo ={
     name:this.name,
     email:this.email,
     address:this.address,
     city:this.city,
     state:this.state,
     zip:this.zip

   }

   localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
   location.reload();
}

  shippingSpeed(event: any){
    let shippingInfo ={
      name:this.name,
      email:this.email,
      address:this.address,
      city:this.city,
      state:this.state,
      zip:this.zip

    }

    localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
    localStorage.setItem('delivery', String(this.sameDayDelivery));
    location.reload();
  }





}
