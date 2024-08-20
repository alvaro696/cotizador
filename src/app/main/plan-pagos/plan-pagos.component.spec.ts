import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPagosComponent } from './plan-pagos.component';

describe('PlanPagosComponent', () => {
  let component: PlanPagosComponent;
  let fixture: ComponentFixture<PlanPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanPagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
