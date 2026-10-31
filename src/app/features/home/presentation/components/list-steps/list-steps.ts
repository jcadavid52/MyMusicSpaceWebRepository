import { Component, input } from '@angular/core';
import { StepModel } from '../../../domain/models/home-models';
import { StepCard } from '../step-card/step-card';

@Component({
  selector: 'app-list-steps',
  imports: [StepCard],
  templateUrl: './list-steps.html',
  styleUrl: './list-steps.css',
})
export class ListSteps {
  readonly steps = input.required<StepModel[]>();
}
