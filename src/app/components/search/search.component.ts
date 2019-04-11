import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  keyword:String = "";

  constructor(private search:SearchService) { }

  ngOnInit(){
    this.keyword = this.search.getKeyword();
    this.search.searchKeyword(this.keyword);

  }




}
