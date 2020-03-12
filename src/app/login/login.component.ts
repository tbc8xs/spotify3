import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  code: string = null;
  state: string = null;

  constructor(private route: ActivatedRoute, private configService: ConfigService, private router: Router) { }
  url : string = "";
  ngOnInit() {
    this.url = this.configService.getAuthorizationURL()
    console.log(this.url);
    
    this.route.queryParams.subscribe(params => {
      if (params.code && params.state) {
        this.code = params.code;
        this.state = params.state;
        this.configService.getRequestRefreshTokens(this.code).subscribe((data:any)=> {
          console.log(data);
          sessionStorage.setItem('access_token',data.access_token);
          sessionStorage.setItem('token_type',data.token_type);
          sessionStorage.setItem('expires_in',data.expires_in);
          sessionStorage.setItem('refresh_token',data.refresh_token);
          sessionStorage.setItem('scope',data.scope);
          this.router.navigate(['/home']);
        }
        )
      }
    });
  }





}
