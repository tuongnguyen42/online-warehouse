import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';

import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private nav:NavService,
    private authService:AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }


  onLogoutClick(){
  this.authService.logout();
  this.flashMessage.show('Logged out!', {
    cssClass: 'alert-success',
    timeout: 3000
  });

}
}
