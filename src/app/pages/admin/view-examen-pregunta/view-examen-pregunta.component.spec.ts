import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamenPreguntaComponent } from './view-examen-pregunta.component';

describe('ViewExamenPreguntaComponent', () => {
  let component: ViewExamenPreguntaComponent;
  let fixture: ComponentFixture<ViewExamenPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewExamenPreguntaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExamenPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
