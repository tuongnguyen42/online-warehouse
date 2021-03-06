import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { ValidateService } from '../../services/validate.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:String;
  password:String;
  checkout:String;

  constructor(
    public nav: NavService,
    public validateService: ValidateService,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.nav.hide();
    this.route.queryParams.subscribe(params => {
    this.checkout = params['checkout'];
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  });
  }

  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }



    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateLogin(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user_id);
        this.flashMessage.show("Logged in!",{
          cssClass: 'alert-success',
          timeout: 5000})
        if (data.type === 'admin'){
          this.router.navigate(['/admin']);
        }
        else {
          if(this.checkout === 'true'){
            this.router.navigate(['/checkout']);
          }
          else{
            this.router.navigate(['/']);
          }
        }
      } 
      else {
        this.flashMessage.show(data.msg,{
          cssClass: 'alert-danger',
          timeout: 5000
        })
        this.router.navigate(['/login']);
      }
    })

  }

}
