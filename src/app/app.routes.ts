import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Legal } from './features/legal/legal';

/**
 * Application route configuration.
 *
 * - `/`      – Renders the main {@link Layout} shell with the home page
 *             (`Home` component) lazy-loaded as a child route.
 * - `/legal` – Renders the {@link Legal} page (Impressum + Datenschutz).
 * - `**`     – Wildcard redirect to the root (German default).
 */
export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
      },
    ],
  },
  { path: 'legal', component: Legal },
  { path: '', redirectTo: 'de', pathMatch: 'full' },
  { path: '**', redirectTo: 'de' },
];
