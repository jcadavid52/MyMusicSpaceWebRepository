import { Component, input } from '@angular/core';
import { FunctionModel } from '../../../domain/models/home.models';
import { FunctionCard } from '../function-card/function-card';

@Component({
  selector: 'app-list-function',
  imports: [FunctionCard],
  templateUrl: './list-function.html',
  styleUrl: './list-function.css',
})
export class ListFunction {
 public readonly functionsModel = input.required<FunctionModel[]>();
}
