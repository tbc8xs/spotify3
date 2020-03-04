import { Injectable } from '@angular/core';
import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
//import { query-string } from 'query-string';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  client_id: string = '32d6f488b7e9464193cd76e8cea8711a'; // Your client id
  client_secret: string = '7cfa925f610d4aa78ea0956874f197b3'; // Your secret
  redirect_uri: string = 'http://localhost:4200/callback'; // Your redirect uri
  scope: string = 'user-read-private user-read-email';

  constructor(private http: HttpClient) { }

  getAuthorization() {
    var state = this.randomString(16);
    // var url = JSON.stringify({
    //   response_type: 'code',
    //   client_id: this.client_id,
    //   scope: this.scope,
    //   redirect_uri: this.redirect_uri,
    //   state: state
    // })
    var url ="client_id="+this.client_id+"&response_type=code&redirect_uri="+  encodeURIComponent(this.redirect_uri) +"&scope="+ encodeURIComponent(this.scope) +"&state="+state;
    console.log(url);
    return this.http.get("https://accounts.spotify.com/authorize?"+ url
    );
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
