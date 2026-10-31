import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSteps } from './list-steps';

describe('ListSteps', () => {
  let component: ListSteps;
  let fixture: ComponentFixture<ListSteps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSteps]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSteps);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
