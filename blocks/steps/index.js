import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, RichText, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, Icon, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { MaterialIcon, ICON_OPTIONS } from '../components/MaterialIcon';
import './editor.scss';
import './style.scss';
import { Panel } from '@wordpress/components';
import { ToggleControl } from '@wordpress/components';

registerBlockType('pryvus/steps', {
    edit: ({ attributes, setAttributes }) => {
        const { sectionLabel, heading, steps, cardBackground, cardBorderColor, cardBorderWidth, iconSize, backgroundSize, borderRadius, hasHover, hasConnectors } = attributes;

        const blockProps = useBlockProps({
            className: 'pryvus-steps-block'
        });

        const updateStep = (index, field, value) => {
            const newSteps = [...steps];
            newSteps[index] = { ...newSteps[index], [field]: value };
            setAttributes({ steps: newSteps });
        };

        const addStep = () => {
            setAttributes({
                steps: [
                    ...steps,
                    {
                        icon: 'star',
                        title: 'New Step',
                        description: 'Step description',
                        iconColor: '#4C8DFF'
                    }
                ]
            });
        };

        const removeStep = (index) => {
            const newSteps = steps.filter((_, i) => i !== index);
            setAttributes({ steps: newSteps });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Steps Settings', 'pryvus-2026')} initialOpen={true}>
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
                        <ToggleControl
                            label={__('Enable Connectors Between Steps', 'pryvus-2026')}
                            checked={attributes.hasConnectors}
                            onChange={(value) => setAttributes({ hasConnectors: value })}
                        />
                    </PanelBody>
                    <PanelBody title={__('Icon Settings', 'pryvus-2026')} initialOpen={false}>
                        <RangeControl
                            label={__('Icon Size', 'pryvus-2026')}
                            value={iconSize}
                            onChange={(value) => setAttributes({ iconSize: value })}
                            min={24}
                            max={64}
                            step={2}
                        />
                        <RangeControl
                            label={__('Background Size', 'pryvus-2026')}
                            value={backgroundSize}
                            onChange={(value) => setAttributes({ backgroundSize: value })}
                            min={48}
                            max={120}
                            step={4}
                        />
                        <RangeControl
                            label={__('Border Radius (%)', 'pryvus-2026')}
                            value={borderRadius}
                            onChange={(value) => setAttributes({ borderRadius: value })}
                            help={__('0 = square, 50 = circle', 'pryvus-2026')}
                            min={0}
                            max={50}
                            step={1}
                        />
                    </PanelBody>
                    <PanelBody title={__('Card', 'pryvus-2026')} initialOpen={false}>
                        <PanelColorSettings
                            title={__('Background', 'pryvus-2026')}
                            colorSettings={[
                                {
                                    value: cardBackground,
                                    onChange: (value) => setAttributes({ cardBackground: value }),
                                    label: __('Card Background', 'pryvus-2026')
                                }
                            ]} />
                        <PanelColorSettings
                            title={__('Border Color', 'pryvus-2026')}
                            colorSettings={[
                                {
                                    value: cardBorderColor,
                                    onChange: (value) => setAttributes({ cardBorderColor: value }),
                                    label: __('Card Border Color', 'pryvus-2026')
                                }
                            ]} />
                        <RangeControl
                            label={__('Card Border Width (px)', 'pryvus-2026')}
                            value={cardBorderWidth}
                            onChange={(value) => { setAttributes({ cardBorderWidth: value }) }}
                            min={0}
                            max={10}
                            step={1}
                        />
                        <ToggleControl
                            label={__('Enable Hover Effect', 'pryvus-2026')}
                            checked={hasHover}
                            onChange={(value) => setAttributes({ hasHover: value })}
                        />
                    </PanelBody>


                    {steps.map((step, index) => (
                        <PanelBody
                            key={index}
                            title={`${__('Step', 'pryvus-2026')} ${index + 1}: ${step.title}`}
                            initialOpen={false}
                        >
                            <TextControl
                                label={__('Icon Name (Material Symbols)', 'pryvus-2026')}
                                value={step.icon}
                                onChange={(value) => updateStep(index, 'icon', value)}
                                help={__('Enter a Material Symbols icon name', 'pryvus-2026')}
                            />
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                                    {__('Quick Select Icon', 'pryvus-2026')}
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                    {ICON_OPTIONS.map(({ label, value }) => (
                                        <button
                                            key={value}
                                            onClick={() => updateStep(index, 'icon', value)}
                                            style={{
                                                padding: '8px',
                                                border: step.icon === value ? '2px solid #4C8DFF' : '1px solid #ddd',
                                                borderRadius: '4px',
                                                background: step.icon === value ? '#f0f6ff' : 'white',
                                                cursor: 'pointer',
                                                fontSize: '20px',
                                                fontFamily: '"Material Symbols Outlined"',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            title={label}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <TextControl
                                label={__('Title', 'pryvus-2026')}
                                value={step.title}
                                onChange={(value) => updateStep(index, 'title', value)}
                            />
                            <TextControl
                                label={__('Description', 'pryvus-2026')}
                                value={step.description}
                                onChange={(value) => updateStep(index, 'description', value)}
                            />
                            <Button
                                isDestructive
                                onClick={() => removeStep(index)}
                                style={{ marginTop: '12px' }}
                            >
                                {__('Remove Step', 'pryvus-2026')}
                            </Button>
                        </PanelBody>
                    ))}

                    <PanelBody>
                        <Button isPrimary onClick={addStep}>
                            {__('Add Step', 'pryvus-2026')}
                        </Button>
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    {sectionLabel && (
                        <div className="steps-label">{sectionLabel}</div>
                    )}
                    {heading && (
                        <h2 className="steps-heading">{heading}</h2>
                    )}
                    <div className={`steps-container alignfull ${hasConnectors ? 'has-connectors' : ''}`}>
                        {steps.map((step, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`step-item ${hasHover ? 'hover-style' : ''}`}
                                    style={{
                                        background: cardBackground,
                                        borderColor: cardBorderColor,
                                        borderWidth: `${cardBorderWidth}px`,
                                        borderStyle: cardBorderWidth > 0 ? 'solid' : 'none'
                                    }}
                                >
                                    <MaterialIcon
                                        icon={step.icon}
                                        iconSize={iconSize}
                                        customIconColor={step.iconColor || '#4C8DFF'}
                                        customBackgroundColor="rgba(76, 141, 255, 0.1)"
                                        backgroundSize={backgroundSize}
                                        borderRadius={`${borderRadius}%`}
                                        className="step-icon"
                                    />
                                    <h3 className="step-title">{step.title}</h3>
                                    <p className="step-description">{step.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const { sectionLabel, heading, steps, cardBackground, cardBorderColor, cardBorderWidth, iconSize, backgroundSize, borderRadius, hasHover, hasConnectors } = attributes;
        const blockProps = useBlockProps.save({
            className: 'pryvus-steps-block'
        });

        return (
            <div {...blockProps}>
                {sectionLabel && (
                    <div className="steps-label">{sectionLabel}</div>
                )}
                {heading && (
                    <h2 className="steps-heading">{heading}</h2>
                )}
                <div className={`steps-container ${hasConnectors ? 'has-connectors' : ''}`}>
                    {steps.map((step, index) => {
                        const iconColor = step.iconColor || '#4C8DFF';
                        
                        return (
                            <div
                                key={index}
                                className={`step-item ${hasHover ? 'hover-style' : ''}`}
                                style={{
                                    background: cardBackground,
                                    borderColor: cardBorderColor,
                                    borderWidth: `${cardBorderWidth}px`,
                                    borderStyle: cardBorderWidth > 0 ? 'solid' : 'none'
                                }}
                            >
                                <div
                                    className="pryvus-icon-container step-icon"
                                    style={{
                                        width: `${backgroundSize}px`,
                                        height: `${backgroundSize}px`,
                                        backgroundColor: 'rgba(76, 141, 255, 0.1)',
                                        borderRadius: `${borderRadius}%`,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        border: 'none'
                                    }}
                                >
                                    <span
                                        className="material-symbols-outlined"
                                        style={{
                                            fontSize: `${iconSize}px`,
                                            color: iconColor
                                        }}
                                    >
                                        {step.icon}
                                    </span>
                                </div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
});
