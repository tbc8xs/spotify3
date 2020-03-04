import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  client_id: string = '32d6f488b7e9464193cd76e8cea8711a'; // Your client id
  client_secret: string = '7cfa925f610d4aa78ea0956874f197b3'; // Your secret
  redirect_uri: string = 'http://localhost:4200/home'; // Your redirect uri
  scope: string = 'user-library-read';

  constructor(private http: HttpClient) { }

  getAuthorizationURL() {
    var state = this.randomString(16);

    var url ="https://accounts.spotify.com/authorize?client_id="+this.client_id+"&response_type=code&redirect_uri="+  encodeURIComponent(this.redirect_uri) +"&scope="+ encodeURIComponent(this.scope) +"&state="+state;
    console.log(url);
    return url;

  }

  randomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }



}
