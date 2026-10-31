import { Component, input } from '@angular/core';
import { FunctionModel } from '../../../domain/models/home-models';

@Component({
  selector: 'app-function-card',
  imports: [],
  templateUrl: './function-card.html',
  styleUrl: './function-card.css',
})
export class FunctionCard {
   public readonly functionModel = input.required<FunctionModel>();
}
