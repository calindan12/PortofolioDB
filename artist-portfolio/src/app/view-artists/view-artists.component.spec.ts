import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArtistsComponent } from './view-artists.component';

describe('ViewArtistsComponent', () => {
  let component: ViewArtistsComponent;
  let fixture: ComponentFixture<ViewArtistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewArtistsComponent]
    });
    fixture = TestBed.createComponent(ViewArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
