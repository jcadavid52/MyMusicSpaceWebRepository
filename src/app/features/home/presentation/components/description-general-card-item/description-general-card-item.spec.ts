import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionGeneralCardItem } from './description-general-card-item';

describe('DescriptionGeneralCardItem', () => {
  let component: DescriptionGeneralCardItem;
  let fixture: ComponentFixture<DescriptionGeneralCardItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionGeneralCardItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionGeneralCardItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
