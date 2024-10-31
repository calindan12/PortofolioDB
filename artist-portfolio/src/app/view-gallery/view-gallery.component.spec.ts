import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGalleryComponent } from './view-gallery.component';

describe('ViewGalleryComponent', () => {
  let component: ViewGalleryComponent;
  let fixture: ComponentFixture<ViewGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewGalleryComponent]
    });
    fixture = TestBed.createComponent(ViewGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
