import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { SongListComponent } from './song-list/song-list.component';
import { ArtistListComponent } from './artist-list/artist-list.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SongListComponent,
    ArtistListComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
