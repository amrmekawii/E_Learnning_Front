import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuationAnswerComponent } from './update-quation-answer.component';

describe('UpdateQuationAnswerComponent', () => {
  let component: UpdateQuationAnswerComponent;
  let fixture: ComponentFixture<UpdateQuationAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateQuationAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQuationAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
