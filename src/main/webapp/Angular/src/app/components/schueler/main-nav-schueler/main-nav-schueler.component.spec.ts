import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavSchuelerComponent } from './main-nav-schueler.component';

describe('MainNavSchuelerComponent', () => {
  let component: MainNavSchuelerComponent;
  let fixture: ComponentFixture<MainNavSchuelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNavSchuelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavSchuelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
