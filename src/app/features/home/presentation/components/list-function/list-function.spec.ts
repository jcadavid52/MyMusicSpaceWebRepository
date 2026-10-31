import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFunction } from './list-function';

describe('ListFunction', () => {
  let component: ListFunction;
  let fixture: ComponentFixture<ListFunction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFunction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFunction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
