import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCitationComponent } from './upload-citation.component';

describe('UploadCitationComponent', () => {
  let component: UploadCitationComponent;
  let fixture: ComponentFixture<UploadCitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
