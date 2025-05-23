// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');
const body = document.body;

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mainNav.classList.toggle('active');
    body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        mainNav.classList.remove('active');
        body.style.overflow = '';
    }
});

// Filter Dropdown Functionality
document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
    const btn = dropdown.querySelector('.filter-btn');

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');

        // Close other dropdowns
        document.querySelectorAll('.filter-dropdown').forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
                otherDropdown.classList.remove('active');
            }
        });
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
});

// Filter option selection
document.querySelectorAll('.filter-options a').forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = option.closest('.filter-dropdown');
        const btn = dropdown.querySelector('.filter-btn span');

        // Update button text
        btn.textContent = option.textContent;

        // Update active state
        dropdown.querySelectorAll('.filter-options a').forEach(link => {
            link.classList.remove('active');
        });
        option.classList.add('active');

        // Close dropdown
        dropdown.classList.remove('active');
    });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const articlesContainer = document.getElementById('articlesContainer');

if (searchInput && articlesContainer) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const articles = Array.from(articlesContainer.querySelectorAll('.article-card'));

        if (searchTerm.length === 0) {
            articles.forEach(article => {
                article.style.display = '';
            });
            return;
        }

        let hasResults = false;

        articles.forEach(article => {
            const title = article.querySelector('.article-title').textContent.toLowerCase();
            const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
            const author = article.querySelector('.article-author-name').textContent.toLowerCase();
            const category = article.querySelector('.article-badge').textContent.toLowerCase();

            if (title.includes(searchTerm) ||
                excerpt.includes(searchTerm) ||
                author.includes(searchTerm) ||
                category.includes(searchTerm)) {
                article.style.display = '';
                hasResults = true;
            } else {
                article.style.display = 'none';
            }
        });

        // Show "no results" message if needed
        const noResults = document.querySelector('.no-results');
        if (!hasResults) {
            if (!noResults) {
                const noResultsDiv = document.createElement('div');
                noResultsDiv.className = 'no-results';
                noResultsDiv.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>No articles found</h3>
                    <p>We couldn't find any articles matching your search. Try different keywords.</p>
                    <a href="#" class="btn btn-outline">Clear search</a>
                `;
                articlesContainer.appendChild(noResultsDiv);

                // Clear search button functionality
                noResultsDiv.querySelector('.btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    searchInput.value = '';
                    articles.forEach(article => {
                        article.style.display = '';
                    });
                    noResultsDiv.remove();
                });
            }
        } else if (noResults) {
            noResults.remove();
        }
    });
}

// Pagination functionality
document.querySelectorAll('.pagination a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Update active page
        document.querySelectorAll('.pagination a').forEach(a => {
            a.classList.remove('current');
        });

        if (!link.classList.contains('prev-next')) {
            link.classList.add('current');
        }
    });
}); 