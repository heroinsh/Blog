// Image optimization utilities
const imageOptimization = {
    // Add lazy loading to images
    addLazyLoading() {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    },

    // Add width and height to images
    addImageDimensions() {
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
            if (img.naturalWidth && img.naturalHeight) {
                img.width = img.naturalWidth;
                img.height = img.naturalHeight;
            }
        });
    },

    // Add srcset for responsive images
    addSrcset() {
        const images = document.querySelectorAll('img[data-srcset]');
        images.forEach(img => {
            img.srcset = img.dataset.srcset;
            delete img.dataset.srcset;
        });
    },

    // Add WebP support
    addWebPSupport() {
        const images = document.querySelectorAll('img[data-webp]');
        images.forEach(img => {
            const webpUrl = img.dataset.webp;
            if (this.supportsWebP()) {
                img.src = webpUrl;
            }
            delete img.dataset.webp;
        });
    },

    // Check WebP support
    supportsWebP() {
        const canvas = document.createElement('canvas');
        if (canvas.getContext && canvas.getContext('2d')) {
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
        return false;
    },

    // Add blur-up loading
    addBlurUpLoading() {
        const images = document.querySelectorAll('img[data-blur]');
        images.forEach(img => {
            const blurUrl = img.dataset.blur;
            const finalUrl = img.src;

            // Create a temporary image to load the blur version
            const tempImg = new Image();
            tempImg.src = blurUrl;

            // When the blur image is loaded, set it as the background
            tempImg.onload = () => {
                img.style.backgroundImage = `url(${blurUrl})`;
                img.style.backgroundSize = 'cover';
                img.style.backgroundPosition = 'center';
                img.style.filter = 'blur(10px)';
                img.style.transition = 'filter 0.3s ease-in-out';

                // Load the final image
                const finalImg = new Image();
                finalImg.src = finalUrl;

                // When the final image is loaded, remove the blur
                finalImg.onload = () => {
                    img.style.filter = 'none';
                };
            };

            delete img.dataset.blur;
        });
    },

    // Add image error handling
    addErrorHandling() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', () => {
                img.src = '/assets/images/placeholder.jpg';
                img.alt = 'Image failed to load';
            });
        });
    },

    // Add image loading animation
    addLoadingAnimation() {
        const images = document.querySelectorAll('img[data-loading]');
        images.forEach(img => {
            const loadingClass = img.dataset.loading;
            img.classList.add(loadingClass);

            img.addEventListener('load', () => {
                img.classList.remove(loadingClass);
            });

            delete img.dataset.loading;
        });
    },

    // Initialize image optimizations
    init() {
        this.addLazyLoading();
        this.addImageDimensions();
        this.addSrcset();
        this.addWebPSupport();
        this.addBlurUpLoading();
        this.addErrorHandling();
        this.addLoadingAnimation();
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    imageOptimization.init();
});

// Export for use in other files
window.imageOptimization = imageOptimization; 