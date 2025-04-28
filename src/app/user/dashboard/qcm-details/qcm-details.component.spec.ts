import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmDetailsComponent } from './qcm-details.component';

describe('QcmDetailsComponent', () => {
  let component: QcmDetailsComponent;
  let fixture: ComponentFixture<QcmDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcmDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
