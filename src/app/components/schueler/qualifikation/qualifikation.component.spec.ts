import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualifikationComponent } from './qualifikation.component';

describe('QualifikationComponent', () => {
  let component: QualifikationComponent;
  let fixture: ComponentFixture<QualifikationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualifikationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualifikationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
