import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-work',
  templateUrl: './artist-work.component.html',
  styleUrls: ['./artist-work.component.css']
})
export class ArtistWorkComponent {
  work: any;
  artist:any;
  isModalOpen = false;


  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    const artistId = this.route.snapshot.paramMap.get('id');
    const workId = this.route.snapshot.paramMap.get('idWork');
    this.artistService.getArtist(artistId).subscribe((data)=>{
      this.artist = data;
    });
    if (artistId && workId) {
      this.artistService.getWorkById(workId).subscribe((data) => {
        console.log("data: " , this.artist)
        this.work = data;
      });
    }
  }


  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }



}
