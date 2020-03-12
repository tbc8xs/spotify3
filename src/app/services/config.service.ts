import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Buffer } from 'buffer';
import { Track } from '../objects/tracks';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  client_id: string = '32d6f488b7e9464193cd76e8cea8711a'; // Your client id
  client_secret: string = '7cfa925f610d4aa78ea0956874f197b3'; // Your secret
  redirect_uri: string = 'http://localhost:4200/login'; // Your redirect uri
  scope: string = 'user-library-read user-top-read';
  //show_dialog = 'true'
  // ^logs the user out/ allows user to change on new authorization

  constructor(private http: HttpClient) { }

  getSavedSongs(token) {
    var self =this;

    let body = new HttpParams()
      .set('limit' , '50')

    let options = {
      headers : new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
    };

    return this.http.get('https://api.spotify.com/v1/me/tracks?limit=50', options);
  }

  getUserInfo(token) {
    let options = {
      headers : new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
    };

    return this.http.get('https://api.spotify.com/v1/me', options);
  }

  getTopSongs(token,link): Observable<Track[]> {
    let options = {
      headers : new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
    };
    return this.http.get<Track[]>(link, options);
  }

  getTopArtists(token,link): Observable<any[]> {
    let options = {
      headers : new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
    };
    return this.http.get<any[]>(link, options);
  }

  getAuthorizationURL() {
    var state = this.randomString(16);

    var url ="https://accounts.spotify.com/authorize?client_id="+this.client_id+"&response_type=code&redirect_uri="+  encodeURIComponent('http://localhost:4200/login') +"&scope="+ encodeURIComponent(this.scope) +"&state="+state + "&show_dialog=true";
    console.log(url);
    return url;
  }

  getRequestRefreshTokens(code) {
    var self =this;

    let body = new HttpParams()
      .set('code' , code)
      .set('redirect_uri' , this.redirect_uri)
      .set('grant_type' , 'authorization_code')

    let options = {
      headers : new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(this.client_id + ':' + this.client_secret))
    };
      
    //console.log(this.http.post('https://accounts.spotify.com/api/token', body, options));

    return this.http.post('https://accounts.spotify.com/api/token', body, options);
  }

  refreshAccessToken(refresh_token) {
    var self =this;

    let body = new HttpParams()
      .set('grant_type' , 'refresh_token')
      .set('refresh_token' , refresh_token)

    let options = {
      headers : new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(this.client_id + ':' + this.client_secret))
    };

    return this.http.post('https://accounts.spotify.com/api/token', body, options);
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
