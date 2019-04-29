import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AgmCoreModule, MapsAPILoader } from "@agm/core";
import { AgmDirectionModule } from 'agm-direction';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RegisterComponent } from "./components/register/register.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { FlashMessagesModule } from "angular2-flash-messages";
import { CartComponent } from "src/app/components/cart/cart.component";
import { AuthGuard } from "./guards/auth.guard";
import { LoginGuard } from "./guards/login.guard";

import { NavService } from "./services/nav.service";
import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { SearchService } from "./services/search.service";
import { ResetpwdComponent } from "./components/resetpwd/resetpwd.component";
import { AboutComponent } from "./components/about/about.component";
import { FaqComponent } from "./components/faq/faq.component";
import { ShippingComponent } from "./components/shipping/shipping.component";
import { ContactComponent } from "./components/contact/contact.component";
import { SearchComponent } from "./components/search/search.component";
import { ProductComponent } from "./components/product/product.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ConfirmationComponent } from "./components/confirmation/confirmation.component";
import { AdminComponent } from "./components/admin/admin.component";
import { TrackingComponent } from "./components/tracking/tracking.component";
import { OrderDetailsComponent } from "./components/order-details/order-details.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "register", component: RegisterComponent, canActivate: [LoginGuard] },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "cart", component: CartComponent },
  { path: "orders", component: OrdersComponent, canActivate: [AuthGuard] },
  { path: "resetpwd", component: ResetpwdComponent },
  { path: "search", component: SearchComponent },
  { path: "product", component: ProductComponent },
  { path: "checkout", component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: "tracking", component: TrackingComponent },
  { path: "order-details", component: OrderDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    ProductComponent,
    CheckoutComponent,
    ConfirmationComponent,
    AdminComponent,
    TrackingComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: "reload"
    }),
    HttpModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyALPpI2grWR5poDZf4JMpHDLMcAHAwZ6R0",
      libraries: ['geometry']
    }),
    AgmDirectionModule
  ],
  providers: [
    SearchService,
    NavService,
    ValidateService,
    AuthService,
    AuthGuard,
    LoginGuard,
    SearchComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
