import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {CartService} from '../../services/cart.service';
import {FlashMessagesService} from 'angular2-flash-messages';
//import { totalmem } from 'os';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {



  //shipping info
  name:String;
  email:String;
  address: String;
  city: String;
  state: String;
  zip:String;

  //paymentInfo
  nameOnCard:String;
  cardNumber:String;
  expMonth:any;
  expYear:any;
  ccv:any;


  //shipping options
  emptyCart:Boolean;
  pickup:Boolean = false;
  truckDelivery:Boolean = true;
  deliveryChoice:Boolean = false;
  sameDayDelivery:Boolean = false;

  price:any;
  shippingCost:any = 0;
  tax:any;
  total:any;
  weight:any;
  totalBeforeTax: any;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private flashMessage:FlashMessagesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.emptyCart = (JSON.parse(localStorage.getItem('cart')).length === 0);
    console.log(localStorage.getItem('user'));

    if(!this.emptyCart){
      if(localStorage.getItem('shippingInfo')){
        let shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
        this.name = shippingInfo.name;
        this.email = shippingInfo.email;
        this.address = shippingInfo.address;
        this.city = shippingInfo.city;
        this.state = shippingInfo.state;
        this.zip = shippingInfo.zip;
        // this.nameOnCard = shippingInfo.nameOnCard;
        // this.cardNumber = shippingInfo.cardNumber;
        // this.expMonth = shippingInfo.expMonth;
        // this.expYear = shippingInfo.expYear;
        // this.ccv = shippingInfo.ccv;
      }
      this.price = this.cartService.getTotalPrice();
      this.weight = this.cartService.getTotalWeight();
      this.pickup = (localStorage.getItem('pickup') === 'true');
      this.sameDayDelivery = (localStorage.getItem('delivery') === 'true');





      if(this.pickup){
        this.sameDayDelivery = false;
        this.truckDelivery = false;
      }
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

    // let f = document.getElementsByTagName('form')[0];
  //   if(f.checkValidity()) {
  //   f.submit();
  // }else {
  //       this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
  // }
    let cart = JSON.parse(localStorage.getItem('cart'));
    let items: Object[] = [];

    for (let i = 0; i < cart.length; i++){
      items.push({
        id:cart[i].item_id,
        qty:cart[i].qty
      });
    }


    const paymentInfo = {
      name:this.name,
      email:this.email,
      address: this.address,
      city: this.city,
      state: this.state,
      zip:this.zip,
      nameOnCard:this.nameOnCard,
      cardNumber:this.cardNumber,
      expMonth:this.expMonth,
      expYear:this.expYear,
      ccv:this.ccv,
      pickup: this.pickup,
      truckDelivery:this.truckDelivery,
      sameDayDelivery:this.sameDayDelivery,
      cart: JSON.stringify(items),
      total:this.total,
      weight:this.weight,
      user_id:localStorage.getItem('user_id')
    }

    this.cartService.placeOrder(paymentInfo).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Order placed!', {cssClass: 'alert-success', timeout: 3000});
        localStorage.removeItem('cart');this.router.navigate(['/confirmation']);
      }
      else {
        this.flashMessage.show('Error processing your order', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    console.log(paymentInfo);
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
     // nameOnCard:this.nameOnCard,
     // cardNumber:this.cardNumber,
     // expMonth:this.expMonth,
     // expYear:this.expYear,
     // ccv:this.ccv

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
      zip:this.zip,
      nameOnCard:this.nameOnCard,
      cardNumber:this.cardNumber,
      expMonth:this.expMonth,
      expYear:this.expYear,
      ccv:this.ccv

    }

    localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
    localStorage.setItem('delivery', String(this.sameDayDelivery));
    location.reload();
  }





}
