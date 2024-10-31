import { Component } from '@angular/core';
import { ArtistService } from '../artist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-gallery',
  templateUrl: './view-gallery.component.html',
  styleUrls: ['./view-gallery.component.css']
})
export class ViewGalleryComponent {
  artists: any[] = [];

  constructor(private artistService: ArtistService,private router: Router) {}

  ngOnInit(): void {
    this.artistService.allArtists().subscribe((data: any[]) => {
      this.artists = data;
      console.log("artisti: " , this.artists)
    });
  }

  // Metodă pentru a naviga la componenta detaliată a artistului
  viewArtistGallery(id: string): void {
    console.log("id: " , id)
    this.router.navigate(['gallery', id]);
  }
}
