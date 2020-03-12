import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { forkJoin } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


// export interface Song {
//   songName: string;
//   artists: string;

// }

// const ELEMENT_DATA: Song[] = [
//   { songName: 'test', artists: 'test' },
//   { songName: 'test', artists: 'test' },

// ];

@Component({
  selector: 'app-common-tracks',
  templateUrl: './common-tracks.component.html',
  styleUrls: ['./common-tracks.component.css']
})


export class CommonTracksComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns;
  dataSource = new MatTableDataSource([]);;

  access_token: string;
  user1: any;
  @Input() user2: any
  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.access_token = sessionStorage.getItem('access_token');
    console.log(this.access_token);
    this.configService.getCurrentUserInfo(this.access_token).subscribe((user: any) => {
      this.user1 = user.id
      //this.findCommonTracks();
    }
    )

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  findCommonTracks() {
    //  this.dataSource = ELEMENT_DATA
    //  this.displayedColumns = ['name', 'artist'];
    console.log('finding common tracks for', this.user1, ', ', this.user2)
    let user1 = 'iff1vukuwc4wbv154duig9xx9'
    let user1Tracks = []
    let user2Tracks = []
    //let user2 = '22xmxpwyvv35byoeqftmekp3y'
    let user1PlaylistIds = [];
    let user2PlaylistIds = [];
    let matchingSongs = [];
    let observables = [];

    this.configService.getPlaylists(this.access_token, this.user1).subscribe((data: any) => {
      console.log('all playlists', data)
      data.items.forEach((playlist) => {
        observables.push(this.configService.getTracks(playlist.id, this.access_token));
        user1PlaylistIds.push(playlist.id);
      })
      forkJoin(observables).subscribe((data: any) => {
        console.log('observables', data);
        data.forEach((playlist) => {
          playlist.items.forEach((song) => {
            let tmp = {
              id: '',
              songName: '',
              artists: []
            };
            tmp.id = song.track.id
            tmp.songName = song.track.name
            tmp.artists = song.track.artists
            user1Tracks.push(tmp);
          })
        })
        this.configService.getPlaylists(this.access_token, this.user2).subscribe((data: any) => {
          observables = []
          for (let playlist of data.items) {
            observables.push(this.configService.getTracks(playlist.id, this.access_token));
            user2PlaylistIds.push(playlist.id);
          }
          forkJoin(observables).subscribe((data: any) => {
            console.log('asdd', data);

            data.forEach((playlist) => {
              playlist.items.forEach((song) => {
                let tmp = {
                  id: '',
                  songName: '',
                  artists: []
                };
                tmp.id = song.track.id
                tmp.songName = song.track.name
                tmp.artists = song.track.artists
                user2Tracks.push(tmp);
              })
            })
            //  console.log('user1 songs', user1Tracks);
            //   console.log('user2 songs', user2Tracks);
            user1Tracks = user1Tracks.reduce((unique, o) => {
              if (!unique.some(obj => obj.id === o.id)) {
                unique.push(o);
              }
              return unique;
            }, []);
            user2Tracks = user2Tracks.reduce((unique, o) => {
              if (!unique.some(obj => obj.id === o.id)) {
                unique.push(o);
              }
              return unique;
            }, []);
            //  console.log('user1 songs', user1Tracks);
            //  console.log('user2 songs', user2Tracks);
            user1Tracks.forEach((element1, index1) => {
              user2Tracks.forEach((element2, index2) => {
                let tmpArtists = []
                if (element1.id === element2.id) {
                  // console.log('found match', element1)
                  //    console.log('index1', index1, 'index2', index2);
                  let tmp = {
                    //id: '',
                    songName: '',
                    artists: ''
                    // artistsArray: []
                  }
                  //   tmp.id = element2.id
                  //  tmp.artistsArray = element2.artists
                  tmp.songName = element2.songName
                  element1.artists.forEach((artist) => {
                    //console.log('artist', artist.name)
                    tmpArtists.push(artist.name);
                  })
                  tmp.artists = tmpArtists.join(", ");
                  matchingSongs.push(tmp);
                }
              })
            })
            this.dataSource = new MatTableDataSource(matchingSongs);
            this.dataSource.sort = this.sort;
            this.displayedColumns = ['name', 'artist'];
            this.dataSource.paginator = this.paginator;
            console.log('matchingsongs', matchingSongs)
          })
        })
      })
    });
  }
  // test2(userName) {
  //   this.getPlaylists(userName).subscribe((data: any) => {
  //     console.log('data here is ', data);

  //   })
  // }
  // test(userName) {
  //   let user1Playlists = [], user2Playlists = []
  //   let call1 = false, call2 = false
  //   //console.log(this.getPlaylists(userName));
  //   this.getPlaylists(userName, callback1);
  //   this.getPlaylists('lomeinhart', callback2)
  //   //  console.log('playlists here', playlists)
  //   function callback1(playlists) {
  //     console.log('call back1', playlists)
  //     user1Playlists = playlists
  //   }

  //   function callback2(playlists) {
  //     console.log('call back2', playlists)
  //     user2Playlists = playlists
  //   }

  //   console.log('user1', user1Playlists)
  //   console.log('user2', user2Playlists)
  //   debugger
  //   if (user1Playlists.length > 0 && user2Playlists.length > 2) {
  //     console.log('user1', user1Playlists)
  //     console.log('user2', user2Playlists)
  //     debugger
  //   }



  // }




  // getPlaylists(userName): Promise<any> {
  //   let tracks = [];
  //   let observables = [];
  //   return this.configService.getPlaylists(this.access_token, userName).toPromise((data: any) => {
  //     console.log('playlists', data)
  //     data.items.forEach((playlist) => {
  //       observables.push(this.configService.getTracks(playlist.id, this.access_token));
  //     })
  //     forkJoin(observables).subscribe((data: any) => {
  //       console.log('observables', data);
  //       data.forEach((playlist) => {
  //         playlist.items.forEach((song) => {
  //           let tmp = {
  //             id: '',
  //             songName: '',
  //             artists: []
  //           };
  //           tmp.id = song.track.id
  //           tmp.songName = song.track.name
  //           tmp.artists = song.track.artists
  //           tracks.push(tmp);
  //         })
  //         return tracks
  //       })
  //       // callback(tracks);
  //     })
  //   })

  // }

  // getAllSongs(currentIndex, playListIds, tracksArray) {
  //   // console.log('getting all songs', currentIndex, 'playListIds', playListIds, 'tracksArray', tracksArray);
  //   if (currentIndex >= playListIds.length) {
  //     console.log('exiting', tracksArray)
  //     return tracksArray
  //   }
  //   else {
  //     this.configService.getTracks(playListIds[currentIndex], this.access_token).subscribe((data: any) => {
  //       currentIndex++;
  //       for (let song of data.items) {
  //         let tmp = {
  //           //id: '',
  //           songName: '',
  //           artists: []
  //         };
  //         // tmp.id = song.track.id
  //         tmp.songName = song.track.name
  //         tmp.artists = song.track.artists
  //         tracksArray.push(tmp);
  //       }
  //       this.getAllSongs(currentIndex, playListIds, tracksArray)

  //     })
  //   }

  // }

}
