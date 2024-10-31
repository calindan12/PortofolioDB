import { Component } from '@angular/core';
import { ArtistService } from '../artist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-artists',
  templateUrl: './view-artists.component.html',
  styleUrls: ['./view-artists.component.css']
})
export class ViewArtistsComponent {

  artists: any[] = [];

  constructor(private artistService: ArtistService,private router: Router) {}

  ngOnInit(): void {
    this.artistService.allArtists().subscribe((data: any[]) => {
      this.artists = data;
      console.log("artisti: " , this.artists)
    });
  }

  // Metodă pentru a naviga la componenta detaliată a artistului
  viewArtist(id: string): void {
    console.log("id: " , id)
    this.router.navigate(['artist', id]);
  }

}
