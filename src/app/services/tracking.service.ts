import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  // order: Number = null;

  constructor(private http:Http) { }
  //
  // searchTracking(order_id){
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:5000/tracking', order_id, {headers: headers})
  //   .pipe(map(res => res.json()));
  // }
}
