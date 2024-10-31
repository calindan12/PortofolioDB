import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistWorkComponent } from './artist-work.component';

describe('ArtistWorkComponent', () => {
  let component: ArtistWorkComponent;
  let fixture: ComponentFixture<ArtistWorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistWorkComponent]
    });
    fixture = TestBed.createComponent(ArtistWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
