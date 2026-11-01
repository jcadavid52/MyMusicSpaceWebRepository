import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DescriptionGeneralCard } from '../../components/description-general-card/description-general-card';
import { CtaSection } from '../../components/cta-section/cta-section';
import { HeroSection } from '../../components/hero-section/hero-section';
import { HomeNav } from '../../components/home-nav/home-nav';
import { FunctionModel, StepModel } from '../../../domain/models/home-models';
import { ListFunction } from '../../components/list-function/list-function';
import { ListSteps } from '../../components/list-steps/list-steps';

@Component({
  selector: 'app-home',
  imports: [
    HeroSection,
    HomeNav,
    DescriptionGeneralCard,
    CtaSection,
    ListFunction,
    ListSteps
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class Home {
  protected readonly functionsModel: FunctionModel[] = [
    {
      title: 'Biblioteca de canciones',
      description:
        'Registra tus canciones y consúltalas en un catálogo único, ordenado y siempre disponible.',
      icon: 'M4 19.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13.5M4 19.5A2.5 2.5 0 0 1 6.5 17H20M8 7h8M8 11h5',
    },
    {
      title: 'Géneros personalizados',
      description:
        'Crea y administra tus propios géneros para clasificar el repertorio según tu criterio musical.',
      icon: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z',
    },
    {
      title: 'Letras completas',
      description:
        'Guarda el texto íntegro de cada canción junto a su información, sin depender de fuentes externas.',
      icon: 'M4 6h16M4 12h16M4 18h10',
    },
    {
      title: 'Traducción al español',
      description:
        'Traduce las letras del ruso, francés e inglés al español para comprender cada canción a fondo.',
      icon: 'M4 5h9M8 3v2M6 10c1.5 2.5 4 4 6.5 4.5M11 5c-.5 3.5-2.5 6.5-5.5 8.5M13 20l4-10 4 10M14.5 16h5',
    },
    {
      title: 'Acordes de guitarra',
      description:
        'Documenta los acordes y progresiones de cada tema para tener el arreglo listo al momento de tocar.',
      icon: 'M9 18V5l12-2v13M9 9l12-2M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
    },
    {
      title: 'Cuenta personal',
      description:
        'El registro protege el acceso: cada usuario inicia sesión y administra únicamente su biblioteca.',
      icon: 'M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5.5 20a6.5 6.5 0 0 1 13 0',
    },
  ];

  protected readonly steps: StepModel[] = [
    {
      number: '01',
      title: 'Crea tu cuenta',
      description:
        'Regístrate para acceder a tu espacio personal y mantener tu biblioteca privada.',
    },
    {
      number: '02',
      title: 'Agrega tu repertorio',
      description:
        'Añade canciones, defíneles un género y completa sus datos principales.',
    },
    {
      number: '03',
      title: 'Enriquece cada canción',
      description:
        'Incorpora la letra, su traducción al español y los acordes de guitarra del tema.',
    },
  ];
}
