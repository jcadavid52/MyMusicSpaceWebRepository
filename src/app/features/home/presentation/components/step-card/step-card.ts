import { Component, input } from '@angular/core';
import { StepModel } from '../../../domain/models/home-models';

@Component({
  selector: 'app-step-card',
  imports: [],
  templateUrl: './step-card.html',
  styleUrl: './step-card.css',
})
export class StepCard {
  readonly stepModel = input.required<StepModel>();
}
