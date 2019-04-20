import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import {SearchService} from '../../services/search.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  keyword:String = "";
  searchResult:[Object];
  page:number = 1;
  totalPages:number[];



  constructor(
    private searchService:SearchService,
    private route:Router,
    private router:ActivatedRoute

  ) {

   }


  ngOnInit(){

    this.router.queryParams.subscribe(params => {
    this.keyword = params['keyword'];
    this.page = params['page'];
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  });
    // this.searchService.keyword.subscribe(keyword => this.keyword = keyword);
    // this.keyword = this.searchService.getKeyword();


    const query = {
      keyword:this.keyword,
      page:this.page
    }
    this.searchService.searchKeyword(query).subscribe(data =>{
      this.searchResult = data.inventory;
      this.totalPages = Array(data.pages);
    })

  }







}
