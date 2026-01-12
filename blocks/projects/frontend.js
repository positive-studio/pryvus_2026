(function() {
    console.log('Projects block frontend script loaded');
    
    function initProjectsBlocks() {
        console.log('Initializing projects blocks...');
        const projectsBlocks = document.querySelectorAll('.wp-block-pryvus-projects');
        console.log('Found blocks:', projectsBlocks.length);
        
        projectsBlocks.forEach(block => {
        const container = block.querySelector('.projects-container');
        console.log('Container:', container);
        console.log('Block dataset:', block.dataset);
        const numberOfPosts = parseInt(block.dataset.posts) || 3;
        const categoryId = parseInt(block.dataset.categoryId) || 0;
        const cardBackground = block.dataset.cardBackground || '#151922';
        const cardBorderColor = block.dataset.cardBorderColor || 'rgba(76, 141, 255, 0.08)';
        const cardBorderWidth = block.dataset.cardBorderWidth || '1';
        const hasHover = block.dataset.hasHover === 'true';
        const showFeaturedImage = block.dataset.showFeaturedImage !== 'false';
        const showCategory = block.dataset.showCategory !== 'false';
        const showMetric = block.dataset.showMetric !== 'false';
        
        console.log('Settings:', { numberOfPosts, hasHover, showFeaturedImage, showCategory, showMetric });
        
        // Show loading state
        container.innerHTML = '<div class="projects-loading"><span>Loading projects...</span></div>';
        
        // Get the WordPress REST API URL
        const apiUrl = window.location.origin + '/wp-json/wp/v2/posts';
        const categoryParam = categoryId > 0 ? `&categories=${categoryId}` : '';
        console.log('Fetching from:', `${apiUrl}?per_page=${numberOfPosts}${categoryParam}&_embed=true`);
        
        // Fetch posts from WordPress REST API
        fetch(`${apiUrl}?per_page=${numberOfPosts}${categoryParam}&_embed=true`)
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(posts => {
                console.log('Posts received:', posts.length);
                if (!posts || posts.length === 0) {
                    container.innerHTML = '<div class="projects-empty"><p>No projects found.</p></div>';
                    return;
                }
                
                container.innerHTML = posts.map(post => {
                    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
                    const tags = post._embedded?.['wp:term']?.[1] || [];
                    const hoverClass = hasHover ? 'hover-style' : '';
                    
                    return `
                        <a href="${post.link}" class="project-card ${hoverClass}" style="
                            background: ${cardBackground};
                            border-color: ${cardBorderColor};
                            border-width: ${cardBorderWidth}px;
                            border-style: ${cardBorderWidth > 0 ? 'solid' : 'none'};
                            text-decoration: none;
                            color: inherit;
                        ">
                            ${showFeaturedImage && featuredImage ? `
                                <div class="project-image">
                                    <img 
                                        src="${featuredImage.media_details?.sizes?.medium?.source_url || featuredImage.source_url}" 
                                        alt="${featuredImage.alt_text || post.title.rendered}"
                                    />
                                </div>
                            ` : ''}
                            
                            <div class="project-content">
                                ${showCategory && tags.length > 0 ? `
                                    <div class="project-categories">
                                        ${tags.slice(0, 3).map(tag => `
                                            <span class="project-category">${tag.name}</span>
                                        `).join('')}
                                    </div>
                                ` : ''}
                                
                                <h3 class="project-title">${post.title.rendered}</h3>
                                
                                <div class="project-excerpt">${post.excerpt.rendered}</div>
                                
                                ${showMetric && post.meta?.result_metric ? `
                                    <div class="project-metric">${post.meta.result_metric}</div>
                                ` : ''}
                            </div>
                        </a>
                    `;
                }).join('');
            })
            .catch(error => {
                console.error('Error loading projects:', error);
                container.innerHTML = '<div class="projects-empty"><p>Error loading projects. Check console for details.</p></div>';
            });
    });
    }
    
    // Run immediately if DOM is already loaded, otherwise wait for DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProjectsBlocks);
    } else {
        initProjectsBlocks();
    }
})();
