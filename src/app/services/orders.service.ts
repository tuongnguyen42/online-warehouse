import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  id: Number = null;

  constructor(private http:Http) { }

  getUserId(){
    return parseInt(localStorage.getItem('user_id'));
  }

  // Searches orders based on userId
  searchUser(){
    const query = {
      id:this.getUserId()
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/orders', query, {headers: headers})
    .pipe(map(res => res.json()));
  }

  //Searches orders by account (Edrees function)
  searchAccount() {
    
  }

  // Searches tracking via orderId
  searchOrder(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/orders/id', id, {headers: headers})
    .pipe(map(res => res.json()));
  }
}
