import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArtistGalleryComponent } from './view-artist-gallery.component';

describe('ViewArtistGalleryComponent', () => {
  let component: ViewArtistGalleryComponent;
  let fixture: ComponentFixture<ViewArtistGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewArtistGalleryComponent]
    });
    fixture = TestBed.createComponent(ViewArtistGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
