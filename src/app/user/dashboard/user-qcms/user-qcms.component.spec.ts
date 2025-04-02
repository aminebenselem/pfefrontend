import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQcmsComponent } from './user-qcms.component';

describe('UserQcmsComponent', () => {
  let component: UserQcmsComponent;
  let fixture: ComponentFixture<UserQcmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserQcmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserQcmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
