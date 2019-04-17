import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  snapshotParam = "initial value";
  subscribedParam = "initial value";

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    // No subscription
    this.snapshotParam = this.route.snapshot.paramMap.get("category");

    // Subscribed
    this.route.paramMap.subscribe(params => {
      this.subscribedParam = params.get("category");
    });
  }

}
