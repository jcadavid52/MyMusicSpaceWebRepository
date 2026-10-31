import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionGeneralList } from './description-general-list';

describe('DescriptionGeneralList', () => {
  let component: DescriptionGeneralList;
  let fixture: ComponentFixture<DescriptionGeneralList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionGeneralList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionGeneralList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
