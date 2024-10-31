import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-view-artist',
  templateUrl: './view-artist.component.html',
  styleUrls: ['./view-artist.component.css']
})
export class ViewArtistComponent implements OnInit{
  works: any[] = [];
  artistId: any;


  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private router: Router

  ) {}

  ngOnInit(): void {
    // Preia ID-ul artistului din URL
    this.artistId = this.route.snapshot.paramMap.get('id');
    console.log("am intrat: " , this.artistId)

    if (this.artistId) {
      this.artistService.getWorksByArtistId(this.artistId).subscribe((data: any[]) => {
        console.log("works: " , data)
        this.works = data;
      });
    }    
  }
  navigateToCreateWork(): void {
    console.log("am apasat: " , this.artistId)
    if (this.artistId) {
      this.router.navigate(['/artist', this.artistId, 'create-work']);
    }
  }
  navigateToUpdateWork(workId: string, artistId: string): void {
    console.log("artistId trimis: " , artistId)
    this.router.navigate(['/work', workId, 'update'], { queryParams: { artistId: artistId } });
  }
  
  deleteWork(workId: string): void {
    if (confirm('Are you sure you want to delete this work?')) {
      this.artistService.deleteWork(workId).subscribe(() => {
        // Actualizează lista de lucrări prin filtrare după ștergere
        this.works = this.works.filter(work => work._id !== workId);
      });
    }
  }
}
