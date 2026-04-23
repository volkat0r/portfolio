import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';

/**
 * Legal page component.
 *
 * Renders the imprint (Impressum) and privacy policy
 * (Datenschutzerklärung) as required by German law.
 * The content is sourced from the i18n translation files.
 */
@Component({
  selector: 'app-legal',
  imports: [Header, Footer, TranslatePipe],
  templateUrl: './legal.html',
  styleUrl: `legal.scss`,
})
export class Legal {}
