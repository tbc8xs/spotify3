import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../services/config.service';
import{ AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  access_token: string = null;
  token_type: string = null;
  expires_in: string = null;
  refresh_token: string = null;
  scope: string = null;
  allSongs : any[];
  allArtists : any[];
  intervalId :any;
  timePeriod : string;
  userData : any;

  constructor(private route: ActivatedRoute, private configService: ConfigService) { }

  ngOnInit() {
    this.timePeriod = "long_term";
    this.access_token = sessionStorage.getItem('access_token');
    this.token_type = sessionStorage.getItem('token_type');
    this.expires_in = sessionStorage.getItem('expires_in');
    this.refresh_token = sessionStorage.getItem('refresh_token');
    this.scope = sessionStorage.getItem('scope');
    this.showUser();
    this.showSongs();
    this.showArtists();
  }

  showUser() {
    this.configService.getUserInfo(this.access_token).subscribe((data:any)=> {
      this.userData = data;
      console.log(data);
    });
  }

  showSongs() {
    this.refreshTokens();
    var self = this;
    var allSongs = [];
    this.configService.getTopSongs(this.access_token,'https://api.spotify.com/v1/me/top/tracks?limit=49&time_range='+ this.timePeriod +'&offset=0').subscribe((data1:any)=> {
      this.configService.getTopSongs(this.access_token,'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range='+ this.timePeriod +'&offset=49').subscribe((data2:any)=> {
        allSongs= data1.items.concat(data2.items);
        this.allSongs = allSongs;
        for (var i = 0; i<allSongs.length; i++){
          this.allSongs[i].index = i+1;
        }
        console.log(this.allSongs);
      });
    });
    
  }

  showArtists() {
    this.refreshTokens();
    var self = this;
    var allArtists = [];
    this.configService.getTopArtists(this.access_token,'https://api.spotify.com/v1/me/top/artists?limit=49&time_range='+ this.timePeriod +'&offset=0').subscribe((data1:any)=> {
      this.configService.getTopArtists(this.access_token,'https://api.spotify.com/v1/me/top/artists?limit=50&time_range='+ this.timePeriod +'&offset=49').subscribe((data2:any)=> {
        allArtists= data1.items.concat(data2.items);
        this.allArtists = allArtists;
        for (var i = 0; i<allArtists.length; i++){
          this.allArtists[i].index = i+1;
          var genreList = "";
          var len = 0;
          if (this.allArtists[i].genres.length >= 6){
            len = 6;
          }
          else{
            len = this.allArtists[i].genres.length;
          }
          for (var j = 0; j<len; j++){
            if (j != len-1){
              genreList += this.allArtists[i].genres[j] + ", ";
            }
            else{
              genreList += this.allArtists[i].genres[j];
            }
          }
          this.allArtists[i].genreList = genreList;
        }
        console.log(this.allArtists);
      });
    }); 
  }

  timePeriodChange() {
    this.showSongs();
    this.showArtists();
  }

  refreshTokens() {
    this.configService.refreshAccessToken(this.refresh_token).subscribe((data:any)=> {
      this.access_token = data.access_token;
      sessionStorage.setItem('access_token',this.access_token);
    })
  }


}
