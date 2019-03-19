import { Component, OnInit } from "@angular/core";
import { NavService } from "../../services/nav.service";

@Component({
  selector: "app-resetpwd",
  templateUrl: "./resetpwd.component.html",
  styleUrls: ["./resetpwd.component.css"]
})
export class ResetpwdComponent implements OnInit {
  constructor(public nav: NavService) {}

  ngOnInit() {
    this.nav.show();
  }
}
