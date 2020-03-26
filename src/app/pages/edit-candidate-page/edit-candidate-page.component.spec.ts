import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandidatePageComponent } from './edit-candidate-page.component';

describe('EditCandidatePageComponent', () => {
  let component: EditCandidatePageComponent;
  let fixture: ComponentFixture<EditCandidatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCandidatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCandidatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
