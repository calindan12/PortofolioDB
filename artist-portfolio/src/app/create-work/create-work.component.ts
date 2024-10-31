import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-create-work',
  templateUrl: './create-work.component.html',
  styleUrls: ['./create-work.component.css']
})
export class CreateWorkComponent implements OnInit{
  workForm: FormGroup;
  artistId: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private router: Router
  ) {
    this.workForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(500)]],
      clientLink: ['', [Validators.pattern('https?://.+')]], // Validare URL
      isVisible: [true]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Validare fișier (tip și dimensiune)
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(this.selectedFile.type)) {
        alert("Tipul fișierului trebuie să fie PNG sau JPEG.");
        this.selectedFile = null;
      } else if (this.selectedFile.size > 2 * 1024 * 1024) { // 2 MB
        alert("Dimensiunea fișierului trebuie să fie sub 2 MB.");
        this.selectedFile = null;
      }
    }
  }
  ngOnInit(): void {
    // Preia artistId din URL
    this.artistId = this.route.snapshot.paramMap.get('artistId');
  }

  onSubmit(): void {
    // console.log("form initial: " , this.selectedFile)
    if (this.workForm.valid && this.artistId) {
      const formData = new FormData();
      formData.append('title', this.workForm.get('title')?.value);
      formData.append('description', this.workForm.get('description')?.value);
      formData.append('clientLink', this.workForm.get('clientLink')?.value);
      formData.append('isVisible', this.workForm.get('isVisible')?.value);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name); // Adaugă fișierul imagine în FormData
      }

      // formData.forEach((value, key) => {
      //   console.log(`${key}:`, value);
      // });
      this.artistService.createWork(this.artistId, formData).subscribe(() => {
        this.router.navigate(['/artist', this.artistId]); // Navighează înapoi la pagina artistului
      });
    }
  }
  get title() {
    return this.workForm.get('title');
  }

  get description() {
    return this.workForm.get('description');
  }

  get clientLink() {
    return this.workForm.get('clientLink');
  }

  onCancel(): void {
    const confirmed = window.confirm("Lucrarea nu va fi salvata. Ești sigur că vrei să continui?");
    
    if (confirmed) {
      // Navighează înapoi la pagina artistului sau la o altă pagină
      this.router.navigate(['/artist', this.artistId]);
    }
  }
}
