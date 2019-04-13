import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private messageSource = new BehaviorSubject<String>("");
  keyword = this.messageSource.asObservable();

  constructor(private http:Http) { }

  changeMessage(message: String){
    this.messageSource.next(message);
  }


  searchKeyword(key){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/search', key,{headers: headers})
    .pipe(map(res => res.json()));
  }
}
