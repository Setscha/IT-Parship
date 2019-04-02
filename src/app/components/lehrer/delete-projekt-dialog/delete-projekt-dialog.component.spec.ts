import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProjektDialogComponent } from './delete-projekt-dialog.component';

describe('DeleteProjektDialogComponent', () => {
  let component: DeleteProjektDialogComponent;
  let fixture: ComponentFixture<DeleteProjektDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProjektDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProjektDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
