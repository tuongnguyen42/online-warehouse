import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./components/about/about.component";
import { FaqComponent } from "./components/faq/faq.component";
import { ShippingComponent } from "./components/shipping/shipping.component";
import { ContactComponent } from "./components/contact/contact.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";

const routes: Routes = [
  { path: "about", component: AboutComponent },
  { path: "faq", component: FaqComponent },
  { path: "shipping", component: ShippingComponent },
  { path: "contact", component: ContactComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
