import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public nav: NavService) { }

  ngOnInit() {
    this.nav.show();
  }

}
