import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';
import './style.scss';

registerBlockType('pryvus/quantifiable-results', {
    edit: ({ attributes, setAttributes }) => {
        const { heading, description, metrics, pageSpeedBefore, pageSpeedAfter, cardBackground, backgroundColor } = attributes;

        const blockProps = useBlockProps({
            className: 'pryvus-quantifiable-results',
            style: {
                backgroundColor: backgroundColor
            }
        });

        const updateMetric = (index, field, value) => {
            const newMetrics = [...metrics];
            newMetrics[index] = { ...newMetrics[index], [field]: value };
            setAttributes({ metrics: newMetrics });
        };

        const addMetric = () => {
            setAttributes({
                metrics: [
                    ...metrics,
                    {
                        label: 'New Metric',
                        improvement: 'Better',
                        beforeValue: '0s',
                        afterValue: '0s',
                        beforePercent: 100,
                        afterPercent: 50
                    }
                ]
            });
        };

        const removeMetric = (index) => {
            const newMetrics = metrics.filter((_, i) => i !== index);
            setAttributes({ metrics: newMetrics });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Results Settings', 'pryvus-2026')} initialOpen={true}>
                        <TextControl
                            label={__('Heading', 'pryvus-2026')}
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                        />
                        <TextControl
                            label={__('Description', 'pryvus-2026')}
                            value={description}
                            onChange={(value) => setAttributes({ description: value })}
                            help={__('Subtitle text explaining the metrics', 'pryvus-2026')}
                        />
                        <TextControl
                            label={__('Card Background', 'pryvus-2026')}
                            value={cardBackground}
                            onChange={(value) => setAttributes({ cardBackground: value })}
                        />
                        <TextControl
                            label={__('Background Color', 'pryvus-2026')}
                            value={backgroundColor}
                            onChange={(value) => setAttributes({ backgroundColor: value })}
                        />
                    </PanelBody>

                    <PanelBody title={__('PageSpeed Insights', 'pryvus-2026')} initialOpen={true}>
                        <RangeControl
                            label={__('Before Score', 'pryvus-2026')}
                            value={pageSpeedBefore}
                            onChange={(value) => setAttributes({ pageSpeedBefore: value })}
                            min={0}
                            max={100}
                        />
                        <RangeControl
                            label={__('After Score', 'pryvus-2026')}
                            value={pageSpeedAfter}
                            onChange={(value) => setAttributes({ pageSpeedAfter: value })}
                            min={0}
                            max={100}
                        />
                    </PanelBody>

                    <PanelBody title={__('Metrics', 'pryvus-2026')} initialOpen={false}>
                        {metrics.map((metric, index) => (
                            <PanelBody
                                key={index}
                                title={metric.label || `Metric ${index + 1}`}
                                initialOpen={false}
                            >
                                <TextControl
                                    label={__('Label', 'pryvus-2026')}
                                    value={metric.label}
                                    onChange={(value) => updateMetric(index, 'label', value)}
                                />
                                <TextControl
                                    label={__('Improvement Text', 'pryvus-2026')}
                                    value={metric.improvement}
                                    onChange={(value) => updateMetric(index, 'improvement', value)}
                                />
                                <TextControl
                                    label={__('Before Value', 'pryvus-2026')}
                                    value={metric.beforeValue}
                                    onChange={(value) => updateMetric(index, 'beforeValue', value)}
                                />
                                <TextControl
                                    label={__('After Value', 'pryvus-2026')}
                                    value={metric.afterValue}
                                    onChange={(value) => updateMetric(index, 'afterValue', value)}
                                />
                                <RangeControl
                                    label={__('Before Bar %', 'pryvus-2026')}
                                    value={metric.beforePercent}
                                    onChange={(value) => updateMetric(index, 'beforePercent', value)}
                                    min={0}
                                    max={100}
                                />
                                <RangeControl
                                    label={__('After Bar %', 'pryvus-2026')}
                                    value={metric.afterPercent}
                                    onChange={(value) => updateMetric(index, 'afterPercent', value)}
                                    min={0}
                                    max={100}
                                />
                                <Button
                                    isDestructive
                                    onClick={() => removeMetric(index)}
                                    style={{ marginTop: '10px' }}
                                >
                                    {__('Remove Metric', 'pryvus-2026')}
                                </Button>
                            </PanelBody>
                        ))}
                        <Button
                            isPrimary
                            onClick={addMetric}
                            style={{ marginTop: '10px' }}
                        >
                            {__('Add Metric', 'pryvus-2026')}
                        </Button>
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="quantifiable-results-container">
                        <div className="quantifiable-results-content">
                            <RichText
                                tagName="h2"
                                value={heading}
                                onChange={(value) => setAttributes({ heading: value })}
                                placeholder={__('Add heading...', 'pryvus-2026')}
                                className="quantifiable-results-heading"
                            />
                            
                            <RichText
                                tagName="p"
                                value={description}
                                onChange={(value) => setAttributes({ description: value })}
                                placeholder={__('Add description...', 'pryvus-2026')}
                                className="quantifiable-results-description"
                            />

                            <div className="quantifiable-results-layout">
                                <div className="metrics-column">
                                    {metrics.map((metric, index) => (
                                        <div key={index} className="metric-item">
                                            <div className="metric-header">
                                                <span className="metric-label">{metric.label}</span>
                                                <span className="metric-improvement">{metric.improvement}</span>
                                            </div>
                                            <div className="metric-bar">
                                                <div 
                                                    className="bar-before" 
                                                    style={{ width: `${metric.beforePercent}%` }}
                                                ></div>
                                                <div 
                                                    className="bar-after" 
                                                    style={{ width: `${metric.afterPercent}%` }}
                                                ></div>
                                            </div>
                                            <div className="metric-values">
                                                <span className="value-before">{metric.beforeValue} (Before)</span>
                                                <span className="value-after">{metric.afterValue} (After)</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pagespeed-column">
                                    <div 
                                        className="pagespeed-card"
                                        style={{ backgroundColor: cardBackground }}
                                    >
                                        <h3 className="pagespeed-title">PageSpeed Insights</h3>
                                        <div className="pagespeed-scores">
                                            <div className="score-item score-before">
                                                <svg className="score-circle" viewBox="0 0 100 100">
                                                    <circle 
                                                        cx="50" 
                                                        cy="50" 
                                                        r="40" 
                                                        fill="none" 
                                                        stroke="#dc2626" 
                                                        strokeWidth="8"
                                                    />
                                                </svg>
                                                <span className="score-number">{pageSpeedBefore}</span>
                                                <span className="score-label">BEFORE</span>
                                            </div>
                                            <div className="score-arrow">→</div>
                                            <div className="score-item score-after">
                                                <svg className="score-circle" viewBox="0 0 100 100">
                                                    <circle 
                                                        cx="50" 
                                                        cy="50" 
                                                        r="40" 
                                                        fill="none" 
                                                        stroke="#22c55e" 
                                                        strokeWidth="8"
                                                    />
                                                </svg>
                                                <span className="score-number">{pageSpeedAfter}</span>
                                                <span className="score-label">AFTER</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const { heading, description, metrics, pageSpeedBefore, pageSpeedAfter, cardBackground, backgroundColor } = attributes;

        const blockProps = useBlockProps.save({
            className: 'pryvus-quantifiable-results',
            style: {
                backgroundColor: backgroundColor
            }
        });

        return (
            <div {...blockProps}>
                <div className="quantifiable-results-container">
                    <div className="quantifiable-results-content">
                        <h2 className="quantifiable-results-heading">{heading}</h2>
                        <p className="quantifiable-results-description">{description}</p>

                        <div className="quantifiable-results-layout">
                            <div className="metrics-column">
                                {metrics.map((metric, index) => (
                                    <div key={index} className="metric-item">
                                        <div className="metric-header">
                                            <span className="metric-label">{metric.label}</span>
                                            <span className="metric-improvement">{metric.improvement}</span>
                                        </div>
                                        <div className="metric-bar">
                                            <div 
                                                className="bar-before" 
                                                style={{ width: `${metric.beforePercent}%` }}
                                            ></div>
                                            <div 
                                                className="bar-after" 
                                                style={{ width: `${metric.afterPercent}%` }}
                                            ></div>
                                        </div>
                                        <div className="metric-values">
                                            <span className="value-before">{metric.beforeValue} (Before)</span>
                                            <span className="value-after">{metric.afterValue} (After)</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pagespeed-column">
                                <div 
                                    className="pagespeed-card"
                                    style={{ backgroundColor: cardBackground }}
                                >
                                    <h3 className="pagespeed-title">PageSpeed Insights</h3>
                                    <div className="pagespeed-scores">
                                        <div className="score-item score-before">
                                            <svg className="score-circle" viewBox="0 0 100 100">
                                                <circle 
                                                    cx="50" 
                                                    cy="50" 
                                                    r="40" 
                                                    fill="none" 
                                                    stroke="#dc2626" 
                                                    strokeWidth="8"
                                                />
                                            </svg>
                                            <span className="score-number">{pageSpeedBefore}</span>
                                            <span className="score-label">BEFORE</span>
                                        </div>
                                        <div className="score-arrow">→</div>
                                        <div className="score-item score-after">
                                            <svg className="score-circle" viewBox="0 0 100 100">
                                                <circle 
                                                    cx="50" 
                                                    cy="50" 
                                                    r="40" 
                                                    fill="none" 
                                                    stroke="#22c55e" 
                                                    strokeWidth="8"
                                                />
                                            </svg>
                                            <span className="score-number">{pageSpeedAfter}</span>
                                            <span className="score-label">AFTER</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});
