import { Component, OnInit } from "@angular/core";
import { NavService } from "../../services/nav.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
  constructor(public nav: NavService) {}

  ngOnInit() {
    this.nav.show();
  }
}
