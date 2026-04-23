import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';

/**
 * Footer component.
 *
 * Displays the copyright notice and navigation links to the
 * legal section (Impressum, Datenschutz) as well as external
 * professional profiles (LinkedIn, GitHub).
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
