import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCitationsComponent } from './list-citations.component';

describe('ListCitationsComponent', () => {
  let component: ListCitationsComponent;
  let fixture: ComponentFixture<ListCitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCitationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
