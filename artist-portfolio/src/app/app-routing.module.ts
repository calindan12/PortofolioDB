import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateArtistComponent } from './create-artist/create-artist.component';
import { ViewArtistsComponent } from './view-artists/view-artists.component';
import { ViewArtistComponent } from './view-artist/view-artist.component';
import { CreateWorkComponent } from './create-work/create-work.component';
import { UpdateWorkComponent } from './update-work/update-work.component';
import { ViewGalleryComponent } from './view-gallery/view-gallery.component';
import { ViewArtistGalleryComponent } from './view-artist-gallery/view-artist-gallery.component';
import { ArtistWorkComponent } from './artist-work/artist-work.component';

const routes: Routes = [
  { path:'', component:ViewGalleryComponent},
  // { path:'home', component:ViewGalleryComponent},
  { path:'createArtist', component:CreateArtistComponent},
  { path:'viewArtists', component:ViewArtistsComponent},
  { path:'artist/:id', component:ViewArtistComponent},
  { path: 'artist/:artistId/create-work', component: CreateWorkComponent }, // Rută pentru crearea lucrării
  { path: 'work/:workId/update', component: UpdateWorkComponent }, // Ruta pentru editarea lucrării
  { path: 'gallery', component: ViewGalleryComponent }, // Ruta pentru editarea lucrării
  { path: 'gallery/:id', component: ViewArtistGalleryComponent },
  { path: 'gallery/:id/:idWork', component: ArtistWorkComponent },






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
