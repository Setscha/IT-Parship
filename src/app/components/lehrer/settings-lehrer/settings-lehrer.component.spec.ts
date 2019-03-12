import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLehrerComponent } from './settings-lehrer.component';

describe('SettingsLehrerComponent', () => {
  let component: SettingsLehrerComponent;
  let fixture: ComponentFixture<SettingsLehrerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsLehrerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLehrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
