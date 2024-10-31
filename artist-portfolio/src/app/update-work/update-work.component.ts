import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-update-work',
  templateUrl: './update-work.component.html',
  styleUrls: ['./update-work.component.css']
})
export class UpdateWorkComponent implements OnInit {

  workForm: FormGroup;
  workId: string | null = null;
  artistId: any;
  selectedFile: File | null = null; // Variabilă pentru fișierul selectat

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

  ngOnInit(): void {
    this.workId = this.route.snapshot.paramMap.get('workId');
    if (this.workId) {
      this.artistService.getWorkById(this.workId).subscribe((work: any) => {
        this.route.queryParams.subscribe(params => {
          this.artistId = params['artistId'];
        });
        this.workForm.patchValue(work);
      });
    }
  }

  // Metodă pentru a captura fișierul selectat
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Validare opțională a fișierului (tip și dimensiune)
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(this.selectedFile.type)) {
        console.error("Invalid file type");
        this.selectedFile = null; // Resetăm fișierul selectat dacă nu este valid
      } else if (this.selectedFile.size > 2 * 1024 * 1024) { // 2 MB
        console.error("File size too large");
        this.selectedFile = null;
      }
    }
  }

  onSubmit(): void {
    if (this.workForm.valid && this.workId) {
      const formData = new FormData();
      formData.append('title', this.workForm.get('title')?.value);
      formData.append('description', this.workForm.get('description')?.value);
      formData.append('clientLink', this.workForm.get('clientLink')?.value);
      formData.append('isVisible', this.workForm.get('isVisible')?.value);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile); // Adaugă fișierul la formData
      }

      this.artistService.updateWork(this.workId, formData).subscribe(() => {
        this.router.navigate(['/artist', this.artistId]);
      });
    }
  }

  // Metode pentru a verifica validarea fiecărui câmp
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
    const confirmed = window.confirm("Modificările pe care le-ai făcut nu vor fi salvate. Ești sigur că vrei să continui?");
    
    if (confirmed) {
      // Navighează înapoi la pagina artistului sau la o altă pagină
      this.router.navigate(['/artist', this.artistId]);
    }
  }
  
}
