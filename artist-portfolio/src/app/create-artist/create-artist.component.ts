import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../artist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.css']
})
export class CreateArtistComponent {

  artistForm: FormGroup;
  selectedFile: File | null = null;


  constructor(
    private fb: FormBuilder,
    private artistService: ArtistService,
    private router: Router

  ) {
    this.artistForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      linkUrl: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.artistForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('firstName', this.artistForm.get('firstName')?.value);
      formData.append('lastName', this.artistForm.get('lastName')?.value);
      formData.append('linkUrl', this.artistForm.get('linkUrl')?.value);
      formData.append('image', this.selectedFile, this.selectedFile.name); // Adaugă imaginea

      this.artistService.createArtist(formData).subscribe(() => {
        this.router.navigate(['/viewArtists']); // Navighează la pagina artiștilor după creare
      });
    }
  }

}
