import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './': chạy được cả ở https://<tài-khoản>.github.io/<repo>/ lẫn tên miền riêng mà không phải sửa gì.
export default defineConfig({ base: './', plugins: [react()] });
