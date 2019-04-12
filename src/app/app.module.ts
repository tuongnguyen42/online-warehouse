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
import { CartComponent } from "src/app/components/cart/cart.component";
import {AuthGuard} from './guards/auth.guard';
import {LoginGuard} from './guards/login.guard';

import { NavService } from "./services/nav.service";
import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { ResetpwdComponent } from "./components/resetpwd/resetpwd.component";
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { ContactComponent } from './components/contact/contact.component';
import { SearchComponent } from './components/search/search.component';

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "register", component: RegisterComponent, canActivate:[LoginGuard]},
  { path: "dashboard", component: DashboardComponent },
  { path: "login", component: LoginComponent, canActivate:[LoginGuard]},
  { path: "cart", component: CartComponent },
  { path: "orders", component: OrdersComponent, canActivate:[AuthGuard] },
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
    ResetpwdComponent,
    AboutComponent,
    FaqComponent,
    ShippingComponent,
    ContactComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FlashMessagesModule.forRoot(),
    FormsModule
  ],
  providers: [NavService, ValidateService, AuthService, AuthGuard, LoginGuard],

  bootstrap: [AppComponent]
})
export class AppModule {}
