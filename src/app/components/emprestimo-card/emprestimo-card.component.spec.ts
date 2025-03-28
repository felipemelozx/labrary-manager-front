import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoCardComponent } from './emprestimo-card.component';

describe('EmprestimoCardComponent', () => {
  let component: EmprestimoCardComponent;
  let fixture: ComponentFixture<EmprestimoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmprestimoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
