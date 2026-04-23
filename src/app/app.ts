import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root application component.
 *
 * Entry point of the Angular application. Renders the active
 * route via `<router-outlet>`. All page-level components are
 * loaded lazily through the router configuration.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styles: [],
})
export class App {}
