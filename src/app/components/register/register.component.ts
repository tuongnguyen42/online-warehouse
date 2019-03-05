import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { ValidateService } from '../../services/validate.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  email:String;
  password:String;
  password2:String;


  constructor(
    public nav: NavService,
    public validateService: ValidateService,
    public router: Router,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.nav.hide();
  }

  onRegisterSubmit(){
  const user = {
    name: this.name,
    email: this.email,
    password: this.password,
    password2: this.password
  }

  if(!this.validateService.validatePassword(this.password, this.password2)){
    this.flashMessage.show('Password must match!', {cssClass: 'alert-danger', timeout: 3000});
    return false;
  }

  // Required Fields
  if(!this.validateService.validateRegister(user)){
    this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
    return false;
  }

  // Validate Email
  if(!this.validateService.validateEmail(user.email)){
    this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
    return false;
  }

  // Register user
  // this.authService.registerUser(user).subscribe(data => {
  //   if(data.success){
  //     this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
  //     this.router.navigate(['/login']);
  //   } else {
  //     this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
  //     this.router.navigate(['/register']);
  //   }
  // });

}


}
