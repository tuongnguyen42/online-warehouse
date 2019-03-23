import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RegisterComponent } from "./components/register/register.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { FlashMessagesModule } from "angular2-flash-messages";
import { CartComponent } from "src/app/cart/cart.component";

import { NavService } from "./services/nav.service";
import { ValidateService } from "./services/validate.service";
import { ResetpwdComponent } from "./components/resetpwd/resetpwd.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "login", component: LoginComponent },
  { path: "cart", component: CartComponent },
  { path: "orders", component: OrdersComponent },
  {
    path: "resetpwd",
    component: ResetpwdComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    CartComponent,
    OrdersComponent,
    ResetpwdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FlashMessagesModule.forRoot(),
    FormsModule
  ],
  providers: [NavService, ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule {}
