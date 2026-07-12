import React, { useEffect } from 'react';

const CloudflareAnalytics = () => {
  useEffect(() => {
    // Only load in production environment
    if (!import.meta.env.PROD) {
      return;
    }

    const token = import.meta.env.VITE_CLOUDFLARE_ANALYTICS_TOKEN;
    if (!token || token === 'YOUR_ANALYTICS_TOKEN') {
      return;
    }

    const scriptId = 'cloudflare-analytics-beacon';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      script.defer = true;
      script.setAttribute(
        'data-cf-beacon',
        JSON.stringify({ token: token })
      );
      document.body.appendChild(script);
    }

    return () => {
      if (script) {
        try {
          script.remove();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  return null;
};

export default CloudflareAnalytics;
