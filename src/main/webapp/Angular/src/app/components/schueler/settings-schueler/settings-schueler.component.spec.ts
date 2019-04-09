import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSchuelerComponent } from './settings-schueler.component';

describe('SettingsSchuelerComponent', () => {
  let component: SettingsSchuelerComponent;
  let fixture: ComponentFixture<SettingsSchuelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsSchuelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSchuelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
