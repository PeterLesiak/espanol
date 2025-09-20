import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

const Home = lazy(() => import('@/routes/Home'));
const Play = lazy(() => import('@/routes/Play'));

export const routes: RouteDefinition[] = [
  { path: '/', component: Home },
  { path: '/play/:game', component: Play },
];
