'use client';

import { useEffect } from 'react';

export default function RegisterServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // instalação como PWA não é crítica — segue funcionando como site normal
      });
    }
  }, []);

  return null;
}
