import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { SearchService } from '../../services/search.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

import {Router} from '@angular/router';
import {SearchComponent} from '../search/search.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  keyword:String = "";

  constructor(
    private nav:NavService,
    private authService:AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private searchService: SearchService,
    private searchComp: SearchComponent
  ) { }

  ngOnInit() {
    // this.searchService.keyword.subscribe(keyword => this.keyword = keyword);
  }

  onSearchSubmit(){
    // this.searchService.changeMessage(this.keyword);
    // this.searchService.storeKeyword(this.keyword);
    if (this.keyword.length === 0){
      this.router.navigate(['/']);
    }else {
      this.router.navigate(['/search'], {queryParams:{keyword:this.keyword}});
      // this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      // this.router.navigate(['/search']));

    }

  }


  onLogoutClick(){
  this.authService.logout();
  this.flashMessage.show('Logged out!', {
    cssClass: 'alert-success',
    timeout: 3000
  });

}
}
