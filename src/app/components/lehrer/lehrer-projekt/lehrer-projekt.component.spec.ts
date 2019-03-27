import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LehrerProjektComponent } from './lehrer-projekt.component';

describe('LehrerProjektComponent', () => {
  let component: LehrerProjektComponent;
  let fixture: ComponentFixture<LehrerProjektComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LehrerProjektComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LehrerProjektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
