import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';
import {SearchService} from '../../services/search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  keyword:String;
  constructor(
    private nav:NavService,
    private router:Router,
    private search:SearchService
  ) { }

  ngOnInit() {
  }

  onSearchSubmit(){
    this.search.storeKeyword(this.keyword);
    this.router.navigate(['/search']);
  }

}
