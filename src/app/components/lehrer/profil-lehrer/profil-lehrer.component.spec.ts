import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilLehrerComponent } from './profil-lehrer.component';

describe('ProfilLehrerComponent', () => {
  let component: ProfilLehrerComponent;
  let fixture: ComponentFixture<ProfilLehrerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilLehrerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilLehrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
