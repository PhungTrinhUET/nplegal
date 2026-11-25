import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource/be-vietnam-pro/vietnamese-400.css';
import '@fontsource/be-vietnam-pro/vietnamese-600.css';
import '@fontsource/be-vietnam-pro/latin-400.css';
import '@fontsource/be-vietnam-pro/latin-600.css';
import '@fontsource/lora/vietnamese-600.css';
import '@fontsource/lora/latin-600.css';
import './styles.css';
import App from './App';

const root = document.getElementById('root')!;
const app = <StrictMode><App /></StrictMode>;
// Bản build đã dựng sẵn HTML (scripts/prerender.mjs) → hydrate; lúc `npm run dev` thì render bình thường.
if (root.hasChildNodes()) hydrateRoot(root, app); else createRoot(root).render(app);
