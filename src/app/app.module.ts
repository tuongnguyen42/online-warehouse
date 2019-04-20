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
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

import { NavService } from "./services/nav.service";
import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { SearchService } from "./services/search.service";
import { ResetpwdComponent } from "./components/resetpwd/resetpwd.component";
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { ContactComponent } from './components/contact/contact.component';
import { SearchComponent } from './components/search/search.component';
import { BrowseComponent } from './components/browse/browse.component';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { AdminComponent } from './components/admin/admin.component';

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "register", component: RegisterComponent, canActivate:[LoginGuard]},
  { path: "dashboard", component: DashboardComponent },
  { path: "login", component: LoginComponent, canActivate:[LoginGuard]},
  { path: "cart", component: CartComponent },
  { path: "orders", component: OrdersComponent, canActivate:[AuthGuard] },
  { path: "resetpwd",component: ResetpwdComponent},
  { path: "search",component: SearchComponent},
  { path: "product",component: ProductComponent},
  { path: "browse/:category", component: BrowseComponent },
  { path: "checkout", component: CheckoutComponent, canActivate:[AuthGuard] }
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
    SearchComponent,
    BrowseComponent,
    ProductComponent,
    CheckoutComponent,
    ConfirmationComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: 'reload'
    }),
    HttpModule,
    FlashMessagesModule.forRoot(),
    FormsModule
  ],
  providers: [SearchService, NavService, ValidateService, AuthService, AuthGuard, LoginGuard, SearchComponent],

  bootstrap: [AppComponent]
})
export class AppModule {}
