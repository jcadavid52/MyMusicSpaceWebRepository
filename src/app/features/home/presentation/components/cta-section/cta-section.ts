import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';


@Component({
  selector: 'app-cta-section',
  imports: [],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class CtaSection {
  readonly title = input('Empieza a construir tu biblioteca musical');
  readonly description = input(
    'Crea tu cuenta, agrega tus primeras canciones y reúne letras, traducciones y acordes en un único espacio hecho a tu medida.'
  );
  readonly ctaLabel = input('Empezar ahora');
  readonly ctaClick = output<void>();
}
