import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:Http) { }


  updateItems(ids){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/admin/update', ids, {headers: headers})
    .pipe(map(res => res.json()));
  }

  addItem(item){
    console.log(item);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/admin/add', item, {headers: headers})
    .pipe(map(res => res.json()));
  }

}
