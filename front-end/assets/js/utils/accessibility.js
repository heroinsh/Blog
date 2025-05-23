// Accessibility improvements
const accessibility = {
    // Add ARIA labels to interactive elements
    addAriaLabels() {
        // Add labels to buttons without text
        document.querySelectorAll('button:not([aria-label])').forEach(button => {
            if (!button.textContent.trim()) {
                const icon = button.querySelector('i, svg');
                if (icon) {
                    button.setAttribute('aria-label', icon.className || 'button');
                }
            }
        });

        // Add labels to links without text
        document.querySelectorAll('a:not([aria-label])').forEach(link => {
            if (!link.textContent.trim()) {
                const icon = link.querySelector('i, svg');
                if (icon) {
                    link.setAttribute('aria-label', icon.className || 'link');
                }
            }
        });
    },

    // Add skip links
    addSkipLinks() {
        const skipLinks = [
            { href: '#main-content', text: 'Skip to main content' },
            { href: '#navigation', text: 'Skip to navigation' },
            { href: '#footer', text: 'Skip to footer' }
        ];

        const skipLinksContainer = document.createElement('div');
        skipLinksContainer.className = 'skip-links';
        skipLinksContainer.setAttribute('role', 'navigation');
        skipLinksContainer.setAttribute('aria-label', 'Skip links');

        skipLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            a.className = 'skip-link';
            skipLinksContainer.appendChild(a);
        });

        document.body.insertBefore(skipLinksContainer, document.body.firstChild);
    },

    // Add keyboard navigation
    addKeyboardNavigation() {
        // Add focus styles
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Alt + 1: Go to home
            if (e.altKey && e.key === '1') {
                window.location.href = '/';
            }
            // Alt + 2: Go to search
            if (e.altKey && e.key === '2') {
                document.querySelector('.search-box input').focus();
            }
            // Alt + 3: Go to main content
            if (e.altKey && e.key === '3') {
                document.querySelector('#main-content').focus();
            }
        });
    },

    // Add focus trap for modals
    addFocusTrap() {
        document.querySelectorAll('[role="dialog"]').forEach(modal => {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            lastFocusable.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        });
    },

    // Initialize all accessibility improvements
    init() {
        this.addAriaLabels();
        this.addSkipLinks();
        this.addKeyboardNavigation();
        this.addFocusTrap();
    }
};

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    accessibility.init();
}); 