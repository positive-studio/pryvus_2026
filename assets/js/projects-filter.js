/**
 * Projects Filter - Client-side filtering without page reload
 */
(function() {
    'use strict';
    
    // Initialize filter functionality when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.querySelector('.projects-filters input[type="search"]');
        const filterSelect = document.getElementById('projects-filter');
        const projectsGrid = document.querySelector('.wp-block-post-template');
        const noResultsMessage = document.querySelector('.wp-block-query-no-results');
        
        console.log('Filter initialized', {searchInput, filterSelect, projectsGrid, noResultsMessage});
        
        if (!searchInput || !filterSelect || !projectsGrid) {
            console.log('Missing required elements');
            return;
        }
        
        // Get all project cards (direct children of the grid)
        const getAllProjectCards = () => {
            return Array.from(projectsGrid.children).filter(child => 
                child.classList.contains('wp-block-group') || 
                child.querySelector('.project-card')
            );
        };
        
        let projectCards = getAllProjectCards();
        console.log('Found project cards:', projectCards.length);
        
        // Extract tags from each card for filtering
        projectCards.forEach((card, index) => {
            // Find the tags container - look for post_tag terms
            const tagsContainer = card.querySelector('.wp-block-post-terms[class*="post_tag"]');
            if (tagsContainer) {
                const tagLinks = tagsContainer.querySelectorAll('a');
                const tags = Array.from(tagLinks).map(link => link.textContent.trim().toLowerCase());
                card.dataset.tags = tags.join(',');
                console.log(`Card ${index} tags:`, tags);
            } else {
                card.dataset.tags = '';
            }
            
            // Extract title and excerpt for search
            const title = card.querySelector('.wp-block-post-title');
            const excerpt = card.querySelector('.wp-block-post-excerpt__excerpt');
            const searchableText = [
                title ? title.textContent : '',
                excerpt ? excerpt.textContent : '',
                card.dataset.tags || ''
            ].join(' ').toLowerCase();
            card.dataset.searchable = searchableText;
        });
        
        // Filter function
        function filterProjects() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const selectedTag = filterSelect.value.toLowerCase();
            let visibleCount = 0;
            
            console.log('Filtering:', {searchTerm, selectedTag});
            
            // Refresh card list in case DOM changed
            projectCards = getAllProjectCards();
            
            projectCards.forEach(card => {
                const cardTags = card.dataset.tags || '';
                const searchableText = card.dataset.searchable || '';
                
                // Check tag filter
                const tagMatch = selectedTag === 'all' || !selectedTag || cardTags.includes(selectedTag);
                
                // Check search term
                const searchMatch = !searchTerm || searchableText.includes(searchTerm);
                
                // Show card if both conditions match
                if (tagMatch && searchMatch) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            console.log('Visible cards:', visibleCount);
            
            // Show/hide no results message
            if (noResultsMessage) {
                if (visibleCount === 0) {
                    noResultsMessage.style.display = 'block';
                    noResultsMessage.style.setProperty('display', 'block', 'important');
                } else {
                    noResultsMessage.style.display = 'none';
                    noResultsMessage.style.setProperty('display', 'none', 'important');
                }
            }
        }
        
        // Debounce function for search input
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
        
        // Event listeners
        searchInput.addEventListener('input', debounce(filterProjects, 300));
        filterSelect.addEventListener('change', filterProjects);
        
        // Prevent form submission on search
        const searchForm = searchInput.closest('form');
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                filterProjects();
                return false;
            });
        }
        
        console.log('Filter setup complete');
    });
})();
