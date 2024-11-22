import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarrierDialogComponent } from './update-carrier-dialog.component';

describe('UpdateCarrierDialogComponent', () => {
  let component: UpdateCarrierDialogComponent;
  let fixture: ComponentFixture<UpdateCarrierDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCarrierDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCarrierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
