import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAcessComponent } from './quiz-acess.component';

describe('QuizAcessComponent', () => {
  let component: QuizAcessComponent;
  let fixture: ComponentFixture<QuizAcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizAcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizAcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
