import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';
import { NavService } from '../../services/nav.service';
import {AdminService} from '../../services/admin.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  //inventory:[Object];
  //updatedInventory:Object[] = [];

  // new item data
  name:String;
  category:String;
  description:String;
  price:number;
  stock:number;
  weight:number;
  warehouse_id:number;

  itemID:number;
  quantity:number;

  constructor(
    public nav: NavService,
    private searchService:SearchService,
    private adminService:AdminService,
    public flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    this.nav.show();
  }

  onAddSubmit() {
    const item = {
      name: this.name,
      category: this.category,
      description: this.description,
      price: this.price,
      stock: this.stock,
      weight: this.weight,
      warehouse_id: this.warehouse_id
    };

    this.adminService.addItem(item).subscribe(data =>{
      if (data.success) {
        this.flashMessage.show('Item added to inventory', {cssClass: 'alert-success', timeout: 3000});
        location.reload();
      }
      else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
      
    });
  }

  onUpdateSubmit() {
    const item = {
      id: this.itemID,
      quantity: this.quantity
    }

    this.adminService.updateItem(item).subscribe(data =>{
      if (data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
        location.reload();
      }
      else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }
  /*updateItem(product){
    let index = 
    let updatedQty = parseFloat((<HTMLInputElement>document.getElementById("qtyUpdate"+index)).value);
    
    temp[index].qty=updatedQty;

    location.reload();
    
  }*/

}
