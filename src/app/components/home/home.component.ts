import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public nav: NavService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.nav.show();
  }

  goTo(category: string): void {
    this.router.navigate(["categories", category]);
  }
}
