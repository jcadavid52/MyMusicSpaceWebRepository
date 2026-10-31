import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionGeneralCard } from './description-general-card';

describe('DescriptionGeneralCard', () => {
  let component: DescriptionGeneralCard;
  let fixture: ComponentFixture<DescriptionGeneralCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionGeneralCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionGeneralCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
