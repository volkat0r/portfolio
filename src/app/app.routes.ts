import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Legal } from './features/legal/legal';

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
