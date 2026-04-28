import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

/**
 * Application route configuration.
 *
 * - `/`        – Renders the main {@link Layout} shell with the home page
 *               (`Home` component) lazy-loaded as a child route.
 * - `/imprint` – Renders the Imprint (Impressum) page.
 * - `/privacy` – Renders the Privacy Policy (Datenschutz) page.
 * - `/legal`   – Redirects to `/imprint` for backwards compatibility.
 * - `**`       – Wildcard redirect to the root.
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
  {
    path: 'imprint',
    loadComponent: () => import('./features/imprint/imprint').then((m) => m.Imprint),
  },
  {
    path: 'privacy',
    loadComponent: () => import('./features/privacy/privacy').then((m) => m.Privacy),
  },
  { path: 'legal', redirectTo: 'imprint', pathMatch: 'full' },
  { path: '', redirectTo: 'de', pathMatch: 'full' },
  { path: '**', redirectTo: 'de' },
];
