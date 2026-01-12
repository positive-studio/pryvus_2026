import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl, ToggleControl, SelectControl, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import './editor.scss';
import './style.scss';

registerBlockType('pryvus/projects', {
    edit: ({ attributes, setAttributes }) => {
        const {
            sectionLabel,
            heading,
            viewAllText,
            viewAllUrl,
            numberOfPosts,
            categoryId,
            backgroundColor,
            cardBackground,
            cardBorderColor,
            cardBorderWidth,
            hasHover,
            showFeaturedImage,
            showCategory,
            showMetric
        } = attributes;

        const blockProps = useBlockProps({
            className: 'pryvus-projects-block',
            style: {
                backgroundColor: backgroundColor
            }
        });

        // Query projects posts
        const { projects, isLoading } = useSelect(
            (select) => {
                const { getEntityRecords, isResolving } = select('core');
                
                const query = {
                    per_page: numberOfPosts,
                    _embed: true,
                    status: 'publish'
                };
                
                if (categoryId > 0) {
                    query.categories = categoryId;
                }
                
                return {
                    projects: getEntityRecords('postType', 'post', query),
                    isLoading: isResolving('getEntityRecords', [
                        'postType',
                        'post',
                        query
                    ])
                };
            },
            [numberOfPosts, categoryId]
        );

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Content Settings', 'pryvus-2026')} initialOpen={true}>
                        <TextControl
                            label={__('Section Label', 'pryvus-2026')}
                            value={sectionLabel}
                            onChange={(value) => setAttributes({ sectionLabel: value })}
                        />
                        <TextControl
                            label={__('Heading', 'pryvus-2026')}
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                        />
                        <TextControl
                            label={__('"View All" Link Text', 'pryvus-2026')}
                            value={viewAllText}
                            onChange={(value) => setAttributes({ viewAllText: value })}
                        />
                        <TextControl
                            label={__('"View All" Link URL', 'pryvus-2026')}
                            value={viewAllUrl}
                            onChange={(value) => setAttributes({ viewAllUrl: value })}
                        />
                        <SelectControl
                            label={__('Category', 'pryvus-2026')}
                            value={categoryId}
                            options={[
                                { label: 'All Categories', value: 0 },
                                { label: 'Projects', value: 8 },
                                { label: 'Uncategorized', value: 1 }
                            ]}
                            onChange={(value) => setAttributes({ categoryId: parseInt(value) })}
                            help={__('Filter posts by category', 'pryvus-2026')}
                        />
                        <RangeControl
                            label={__('Number of Projects', 'pryvus-2026')}
                            value={numberOfPosts}
                            onChange={(value) => setAttributes({ numberOfPosts: value })}
                            min={1}
                            max={12}
                            step={1}
                        />
                    </PanelBody>

                    <PanelBody title={__('Display Options', 'pryvus-2026')} initialOpen={false}>
                        <ToggleControl
                            label={__('Show Featured Image', 'pryvus-2026')}
                            checked={showFeaturedImage}
                            onChange={(value) => setAttributes({ showFeaturedImage: value })}
                        />
                        <ToggleControl
                            label={__('Show Tags', 'pryvus-2026')}
                            checked={showCategory}
                            onChange={(value) => setAttributes({ showCategory: value })}
                        />
                        <ToggleControl
                            label={__('Show Result Metric', 'pryvus-2026')}
                            checked={showMetric}
                            onChange={(value) => setAttributes({ showMetric: value })}
                        />
                        <ToggleControl
                            label={__('Enable Hover Effect', 'pryvus-2026')}
                            checked={hasHover}
                            onChange={(value) => setAttributes({ hasHover: value })}
                        />
                    </PanelBody>

                    <PanelBody title={__('Block Style', 'pryvus-2026')} initialOpen={false}>
                        <PanelColorSettings
                            title={__('Background Color', 'pryvus-2026')}
                            colorSettings={[
                                {
                                    value: backgroundColor,
                                    onChange: (value) => setAttributes({ backgroundColor: value }),
                                    label: __('Block Background', 'pryvus-2026')
                                }
                            ]}
                        />
                    </PanelBody>

                    <PanelBody title={__('Card Style', 'pryvus-2026')} initialOpen={false}>
                        <PanelColorSettings
                            title={__('Background', 'pryvus-2026')}
                            colorSettings={[
                                {
                                    value: cardBackground,
                                    onChange: (value) => setAttributes({ cardBackground: value }),
                                    label: __('Card Background', 'pryvus-2026')
                                }
                            ]}
                        />
                        <PanelColorSettings
                            title={__('Border Color', 'pryvus-2026')}
                            colorSettings={[
                                {
                                    value: cardBorderColor,
                                    onChange: (value) => setAttributes({ cardBorderColor: value }),
                                    label: __('Card Border Color', 'pryvus-2026')
                                }
                            ]}
                        />
                        <RangeControl
                            label={__('Card Border Width (px)', 'pryvus-2026')}
                            value={cardBorderWidth}
                            onChange={(value) => setAttributes({ cardBorderWidth: value })}
                            min={0}
                            max={10}
                            step={1}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="projects-header">
                        <div className="projects-header-left">
                            {sectionLabel && (
                                <div className="projects-label">{sectionLabel}</div>
                            )}
                            {heading && (
                                <h2 className="projects-heading">{heading}</h2>
                            )}
                        </div>
                        {viewAllText && (
                            <a href={viewAllUrl} className="projects-view-all">
                                {viewAllText} →
                            </a>
                        )}
                    </div>

                    <div className="projects-container">
                        {isLoading && (
                            <div className="projects-loading">
                                <Spinner />
                            </div>
                        )}

                        {!isLoading && projects && projects.length > 0 && (
                            projects.map((project) => {
                                const featuredImage = project._embedded?.['wp:featuredmedia']?.[0];
                                const tags = project._embedded?.['wp:term']?.[1] || [];
                                
                                return (
                                    <div
                                        key={project.id}
                                        className={`project-card ${hasHover ? 'hover-style' : ''}`}
                                        style={{
                                            background: cardBackground,
                                            borderColor: cardBorderColor,
                                            borderWidth: `${cardBorderWidth}px`,
                                            borderStyle: cardBorderWidth > 0 ? 'solid' : 'none'
                                        }}
                                    >
                                        {showFeaturedImage && featuredImage && (
                                            <div className="project-image">
                                                <img
                                                    src={featuredImage.media_details?.sizes?.medium?.source_url || featuredImage.source_url}
                                                    alt={featuredImage.alt_text || project.title.rendered}
                                                />
                                            </div>
                                        )}
                                        
                                        <div className="project-content">
                                            {showCategory && tags.length > 0 && (
                                                <div className="project-categories">
                                                    {tags.slice(0, 3).map((tag) => (
                                                        <span key={tag.id} className="project-category">
                                                            {tag.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            <h3
                                                className="project-title"
                                                dangerouslySetInnerHTML={{ __html: project.title.rendered }}
                                            />
                                            
                                            <div
                                                className="project-excerpt"
                                                dangerouslySetInnerHTML={{ __html: project.excerpt.rendered }}
                                            />
                                            
                                            {showMetric && project.meta?.result_metric && (
                                                <div className="project-metric">
                                                    {project.meta.result_metric}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}

                        {!isLoading && (!projects || projects.length === 0) && (
                            <div className="projects-empty">
                                <p>{__('No projects found. Create some posts to display here.', 'pryvus-2026')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const {
            sectionLabel,
            heading,
            viewAllText,
            viewAllUrl,
            numberOfPosts,
            categoryId,
            backgroundColor,
            cardBackground,
            cardBorderColor,
            cardBorderWidth,
            hasHover,
            showFeaturedImage,
            showCategory,
            showMetric
        } = attributes;
        
        const blockProps = useBlockProps.save({
            className: 'pryvus-projects-block',
            style: {
                backgroundColor: backgroundColor
            }
        });

        return (
            <div 
                {...blockProps} 
                data-posts={numberOfPosts}                data-category-id={categoryId}                data-card-background={cardBackground}
                data-card-border-color={cardBorderColor}
                data-card-border-width={cardBorderWidth}
                data-has-hover={hasHover}
                data-show-featured-image={showFeaturedImage}
                data-show-category={showCategory}
                data-show-metric={showMetric}
            >
                <div className="projects-header">
                    <div className="projects-header-left">
                        {sectionLabel && (
                            <div className="projects-label">{sectionLabel}</div>
                        )}
                        {heading && (
                            <h2 className="projects-heading">{heading}</h2>
                        )}
                    </div>
                    {viewAllText && (
                        <a href={viewAllUrl} className="projects-view-all">
                            {viewAllText} →
                        </a>
                    )}
                </div>
                <div className="projects-container">
                    {/* Projects will be loaded dynamically */}
                </div>
            </div>
        );
    }
});
