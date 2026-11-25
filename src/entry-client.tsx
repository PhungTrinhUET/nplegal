import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource/be-vietnam-pro/vietnamese-400.css';
import '@fontsource/be-vietnam-pro/latin-400.css';
import '@fontsource/be-vietnam-pro/vietnamese-600.css';
import '@fontsource/be-vietnam-pro/latin-600.css';
import '@fontsource/lora/vietnamese-500.css';
import '@fontsource/lora/latin-500.css';
import '@fontsource/lora/vietnamese-500-italic.css';
import '@fontsource/lora/latin-500-italic.css';
import './styles.css';
import App from './App';
import { parseRoute, type Route } from './routes';

const root = document.getElementById('root')!;
// Bản build: mỗi trang HTML ghi sẵn route trong data-route (scripts/prerender.mjs). Lúc `npm run dev`: suy từ địa chỉ.
const route: Route = root.dataset.route ? JSON.parse(root.dataset.route) : parseRoute(location.pathname);
const app = <StrictMode><App route={route} /></StrictMode>;
if (root.hasChildNodes()) hydrateRoot(root, app); else createRoot(root).render(app);
