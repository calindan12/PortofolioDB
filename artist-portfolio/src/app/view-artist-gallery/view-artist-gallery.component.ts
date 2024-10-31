import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-view-artist-gallery',
  templateUrl: './view-artist-gallery.component.html',
  styleUrls: ['./view-artist-gallery.component.css']
})
export class ViewArtistGalleryComponent implements OnInit{

  works: any[] = [];
  artist:any;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private router: Router,

  ) {}


  ngOnInit(): void {
    const artistId = this.route.snapshot.paramMap.get('id');
    console.log("id: , " , artistId)
    this.artistService.getArtist(artistId).subscribe((artist)=>{
      this.artist = artist;
    });
    console.log("artist: " , this.artist)
    if (artistId) {
      this.artistService.getVisibleWorksByArtist(artistId).subscribe((works) => {
        this.works = works;
      });
    }
  }



  viewWork(artistId: string, workId: string): void {
    this.router.navigate(['/gallery', artistId, workId]);
  }

}
