import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizaComponent } from './cotiza.component';

describe('CotizaComponent', () => {
  let component: CotizaComponent;
  let fixture: ComponentFixture<CotizaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CotizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
