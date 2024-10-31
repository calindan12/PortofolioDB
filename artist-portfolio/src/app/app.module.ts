import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { CreateArtistComponent } from './create-artist/create-artist.component';
import { ViewArtistsComponent } from './view-artists/view-artists.component';
import { ViewArtistComponent } from './view-artist/view-artist.component';
import { CreateWorkComponent } from './create-work/create-work.component';
import { UpdateWorkComponent } from './update-work/update-work.component';
import { ViewGalleryComponent } from './view-gallery/view-gallery.component';
import { ViewArtistGalleryComponent } from './view-artist-gallery/view-artist-gallery.component';
import { ArtistWorkComponent } from './artist-work/artist-work.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    CreateArtistComponent,
    ViewArtistsComponent,
    ViewArtistComponent,
    CreateWorkComponent,
    UpdateWorkComponent,
    ViewGalleryComponent,
    ViewArtistGalleryComponent,
    ArtistWorkComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
