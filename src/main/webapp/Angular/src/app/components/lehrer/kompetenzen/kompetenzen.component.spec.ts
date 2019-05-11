import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KompetenzenComponent } from './kompetenzen.component';

describe('KompetenzenComponent', () => {
  let component: KompetenzenComponent;
  let fixture: ComponentFixture<KompetenzenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KompetenzenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KompetenzenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
