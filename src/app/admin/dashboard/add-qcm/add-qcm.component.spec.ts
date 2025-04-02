import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQcmComponent } from './add-qcm.component';

describe('AddQcmComponent', () => {
  let component: AddQcmComponent;
  let fixture: ComponentFixture<AddQcmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQcmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
