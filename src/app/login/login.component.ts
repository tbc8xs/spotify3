import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private configService: ConfigService) { }

  ngOnInit() {
  }

  authorize(){
    this.configService.getAuthorization()
    .subscribe(result => {
      //console.log(result);
    });
  }

  loginClicked(){
    this.authorize();
  }

}
