import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildGradesComponent } from './child-grades.component';

describe('ChildGradesComponent', () => {
  let component: ChildGradesComponent;
  let fixture: ComponentFixture<ChildGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildGradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
