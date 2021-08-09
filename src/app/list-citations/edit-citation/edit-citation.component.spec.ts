import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCitationComponent } from './edit-citation.component';

describe('EditCitationComponent', () => {
  let component: EditCitationComponent;
  let fixture: ComponentFixture<EditCitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
