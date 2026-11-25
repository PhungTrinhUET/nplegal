import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
export { site } from './site';

export const render = () => renderToString(<StrictMode><App /></StrictMode>);
