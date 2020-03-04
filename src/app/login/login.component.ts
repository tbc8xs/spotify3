import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private configService: ConfigService) { }
  url : string = "";
  ngOnInit() {
    this.url = this.configService.getAuthorizationURL()
    console.log(this.url);
  }





}
