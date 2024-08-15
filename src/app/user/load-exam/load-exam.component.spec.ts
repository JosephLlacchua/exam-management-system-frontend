import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadExamComponent } from './load-exam.component';

describe('LoadExamComponent', () => {
  let component: LoadExamComponent;
  let fixture: ComponentFixture<LoadExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
