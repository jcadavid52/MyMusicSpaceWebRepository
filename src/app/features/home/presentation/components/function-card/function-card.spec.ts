import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionCard } from './function-card';

describe('FunctionCard', () => {
  let component: FunctionCard;
  let fixture: ComponentFixture<FunctionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunctionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
