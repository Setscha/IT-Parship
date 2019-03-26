import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillpointsComponent } from './skillpoints.component';

describe('SkillpointsComponent', () => {
  let component: SkillpointsComponent;
  let fixture: ComponentFixture<SkillpointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillpointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
