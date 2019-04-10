import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  keyword: String = "";

  constructor(private http:Http) { }

  storeKeyword(keyword){
    this.keyword = keyword;
  }

  getKeyword(){
    let temp = this.keyword;
    this.keyword = "";
    return temp;
  }



  searchKeyword(keyword){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/search', keyword,{headers: headers})
    .pipe(map(res => res.json()));
  }
}
