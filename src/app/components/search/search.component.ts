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
  searchResult:[Object];



  constructor(private searchService:SearchService) {

   }

  ngOnInit(){
    this.searchService.keyword.subscribe(keyword => this.keyword = keyword);

    const query = {
      keyword:this.keyword
    }
    this.searchService.searchKeyword(query).subscribe(data =>{
      this.searchResult = data.inventory;
    })



    console.log(this.searchResult);
  }







}
