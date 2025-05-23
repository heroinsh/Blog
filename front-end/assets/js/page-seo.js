// Page-specific SEO optimizations
const pageSEO = {
    // Add structured data for blog posts
    addBlogPostStructuredData(post) {
        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            image: post.image,
            datePublished: post.publishedDate,
            dateModified: post.modifiedDate,
            author: {
                '@type': 'Person',
                name: post.author.name,
                url: post.author.url
            },
            publisher: {
                '@type': 'Organization',
                name: 'Your Blog Name',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://yourdomain.com/assets/images/logo.png'
                }
            },
            description: post.description,
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': post.url
            }
        };

        window.seo.addStructuredData(structuredData);
    },

    // Add structured data for breadcrumbs
    addBreadcrumbStructuredData(breadcrumbs) {
        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: item.url
            }))
        };

        window.seo.addStructuredData(structuredData);
    },

    // Add structured data for FAQ
    addFAQStructuredData(faqs) {
        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer
                }
            }))
        };

        window.seo.addStructuredData(structuredData);
    },

    // Add meta tags for social sharing
    addSocialMetaTags(page) {
        const metaTags = {
            'og:title': page.title,
            'og:description': page.description,
            'og:url': page.url,
            'og:image': page.image,
            'twitter:title': page.title,
            'twitter:description': page.description,
            'twitter:image': page.image
        };

        window.seo.addMetaTags(metaTags);
    },

    // Add canonical URL
    addCanonicalURL(url) {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = url;
        document.head.appendChild(link);
    },

    // Add alternate language links
    addAlternateLanguages(languages) {
        languages.forEach(lang => {
            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = lang.code;
            link.href = lang.url;
            document.head.appendChild(link);
        });
    },

    // Initialize page-specific SEO
    init(page) {
        if (page.type === 'blog-post') {
            this.addBlogPostStructuredData(page);
        }
        
        if (page.breadcrumbs) {
            this.addBreadcrumbStructuredData(page.breadcrumbs);
        }
        
        if (page.faqs) {
            this.addFAQStructuredData(page.faqs);
        }
        
        this.addSocialMetaTags(page);
        this.addCanonicalURL(page.url);
        
        if (page.alternateLanguages) {
            this.addAlternateLanguages(page.alternateLanguages);
        }
    }
};

// Export for use in other files
window.pageSEO = pageSEO; 