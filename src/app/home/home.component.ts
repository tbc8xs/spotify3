import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  code: string = null;
  state: string = null;

  access_token: string = null;
  token_type: string = null;
  expires_in: string = null;
  refresh_token: string = null;
  scope: string = null;

  constructor(private route: ActivatedRoute, private configService: ConfigService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params.code && params.state) {
          this.code = params.code;
          this.state = params.state;
          this.configService.getRequestRefreshTokens(this.code).subscribe((data:any)=> {
            console.log(data);
            this.access_token = data.access_token;
            this.token_type = data.token_type;
            this.expires_in = data.expires_in;
            this.refresh_token = data.refresh_token;
            this.scope = data.scope;
          }
          )
      }
    });

  }

}
