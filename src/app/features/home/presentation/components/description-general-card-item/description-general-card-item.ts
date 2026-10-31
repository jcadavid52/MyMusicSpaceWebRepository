import { Component, input } from '@angular/core';
import { DescriptionGeneralCardItemModel } from '../../../domain/models/home-models';

@Component({
  selector: 'app-description-general-card-item',
  imports: [],
  templateUrl: './description-general-card-item.html',
  styleUrl: './description-general-card-item.css',
})
export class DescriptionGeneralCardItem {
  public readonly descriptionGeneralCardItemModel = input.required<DescriptionGeneralCardItemModel>();

}
