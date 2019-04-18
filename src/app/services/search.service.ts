import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // private messageSource = new BehaviorSubject<String>("");
  // keyword = this.messageSource.asObservable();

  keyword: String = "";



  constructor(private http:Http) { }

  // changeMessage(message: String){
  //   this.messageSource.next(message);
  // }


  // storeKeyword(key){
  //   this.keyword = key;
  // }
  //
  // getKeyword(){
  //   console.log(this.keyword);
  //   return this.keyword;
  //
  // }
  searchKeyword(key){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/search', key,{headers: headers})
    .pipe(map(res => res.json()));


  }

  searchItem(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/search/id', id,{headers: headers})
    .pipe(map(res => res.json()));


  }
}
