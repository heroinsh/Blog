// Performance optimization functions
const performance = {
    // Preload critical resources
    preloadCriticalResources() {
        const criticalResources = [
            '/assets/css/variables.css',
            '/assets/css/reset.css',
            '/assets/css/style.css',
            '/assets/fonts/your-main-font.woff2'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = resource.endsWith('.css') ? 'style' : 'font';
            link.href = resource;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    },

    // Defer non-critical JavaScript
    deferNonCriticalJS() {
        const scripts = document.querySelectorAll('script[data-defer]');
        scripts.forEach(script => {
            script.defer = true;
            script.removeAttribute('data-defer');
        });
    },

    // Add resource hints
    addResourceHints() {
        const domains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdn.jsdelivr.net'
        ];

        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);

            const preconnect = document.createElement('link');
            preconnect.rel = 'preconnect';
            preconnect.href = domain;
            preconnect.crossOrigin = 'anonymous';
            document.head.appendChild(preconnect);
        });
    },

    // Initialize performance optimizations
    init() {
        this.preloadCriticalResources();
        this.deferNonCriticalJS();
        this.addResourceHints();
    }
};

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    performance.init();
}); 