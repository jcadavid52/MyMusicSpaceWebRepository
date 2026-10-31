import { Component, input } from '@angular/core';
import { DescriptionGeneralCardItem } from '../description-general-card-item/description-general-card-item';
import { DescriptionGeneralCardItemModel } from '../../../domain/models/home.models';

@Component({
  selector: 'app-description-general-list',
  imports: [DescriptionGeneralCardItem],
  templateUrl: './description-general-list.html',
  styleUrl: './description-general-list.css',
})
export class DescriptionGeneralList {
  readonly descriptionGeneralCardItems = input.required<DescriptionGeneralCardItemModel[]>();
}
