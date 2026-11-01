import { Component } from '@angular/core';
import { DescriptionGeneralList } from '../description-general-list/description-general-list';
import {  DescriptionGeneralCardItemModel } from '../../../domain/models/home-models';

@Component({
  selector: 'app-description-general-card',
  imports: [DescriptionGeneralList],
  templateUrl: './description-general-card.html',
  styleUrl: './description-general-card.css',
})
export class DescriptionGeneralCard {
protected readonly descriptionGeneralCardItems: DescriptionGeneralCardItemModel[] = [
    {
      title: 'Acceso',
      description: 'Registro obligatorio · sesión personal',
    },
    {
      title: 'Traducción',
      description: 'Ruso · Francés · Inglés → Español',
    },
    {
      title: 'Instrumento',
      description: 'Acordes y progresiones de guitarra',
    }
  ];
}
