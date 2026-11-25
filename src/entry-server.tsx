import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import type { Route } from './routes';
export { site } from './site';
export { allRoutes, pathOf } from './routes';

export const render = (route: Route) => renderToString(<StrictMode><App route={route} /></StrictMode>);
