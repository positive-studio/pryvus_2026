import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';
import './style.scss';

console.log('Loading Pryvus Icon block...');

// Popular Material Icons list
const ICON_OPTIONS = [
	{ label: 'Star', value: 'star' },
	{ label: 'Rocket Launch', value: 'rocket_launch' },
	{ label: 'Lightbulb', value: 'lightbulb' },
	{ label: 'Shopping Cart', value: 'shopping_cart' },
	{ label: 'School', value: 'school' },
	{ label: 'Store', value: 'store' },
	{ label: 'Code', value: 'code' },
	{ label: 'Build', value: 'build' },
	{ label: 'Verified', value: 'verified' },
	{ label: 'Security', value: 'security' },
	{ label: 'Speed', value: 'speed' },
	{ label: 'Analytics', value: 'analytics' },
	{ label: 'Cloud', value: 'cloud' },
	{ label: 'Devices', value: 'devices' },
	{ label: 'Dashboard', value: 'dashboard' },
	{ label: 'Payments', value: 'payments' },
	{ label: 'Groups', value: 'groups' },
	{ label: 'Support', value: 'support_agent' },
	{ label: 'Settings', value: 'settings' },
	{ label: 'Check Circle', value: 'check_circle' }
];

console.log('Registering pryvus/icon block...');
const blockRegistration = registerBlockType('pryvus/icon', {
	edit: ({ attributes, setAttributes }) => {
		const {
			icon,
			iconSize,
			iconColor,
			customIconColor,
			backgroundColor,
			customBackgroundColor,
			backgroundSize,
			borderRadius,
			hasBorder,
			borderColor,
			borderWidth
		} = attributes;

		const iconColorValue = iconColor ? `var(--wp--preset--color--${iconColor})` : customIconColor || '#4C8DFF';
		const backgroundColorValue = backgroundColor ? `var(--wp--preset--color--${backgroundColor})` : customBackgroundColor || 'transparent';

		const blockProps = useBlockProps({
			style: {
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}
		});

		const iconContainerStyle = {
			width: `${backgroundSize}px`,
			height: `${backgroundSize}px`,
			backgroundColor: backgroundColorValue,
			borderRadius: `${borderRadius}px`,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			border: hasBorder ? `${borderWidth}px solid ${borderColor}` : 'none'
		};

		const iconStyle = {
			fontSize: `${iconSize}px`,
			color: iconColorValue
		};

		return (
			<>
				<InspectorControls>
				<PanelBody title={__('Icon Settings', 'pryvus-blocks')} initialOpen={true}>
					<TextControl
						label={__('Icon Name (Material Symbols)', 'pryvus-blocks')}
							value={icon}
							onChange={(value) => setAttributes({ icon: value })}
						help={__('Enter a Material Symbols icon name', 'pryvus-blocks')}
					/>
					<div style={{ marginBottom: '16px' }}>
						<label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
							{__('Quick Select', 'pryvus-blocks')}
							</label>
							<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
								{ICON_OPTIONS.map(({ label, value }) => (
									<button
										key={value}
										onClick={() => setAttributes({ icon: value })}
										style={{
											padding: '8px',
											border: icon === value ? '2px solid #4C8DFF' : '1px solid #ddd',
											borderRadius: '4px',
											background: icon === value ? '#f0f6ff' : 'white',
											cursor: 'pointer',
											fontSize: '24px',
											fontFamily: '"Material Symbols Outlined"'
										}}
										title={label}
									>
										<span className="material-symbols-outlined">{value}</span>
									</button>
								))}
							</div>
						</div>
						<RangeControl
						label={__('Icon Size (px)', 'pryvus-blocks')}
							value={iconSize}
							onChange={(value) => setAttributes({ iconSize: value })}
							min={16}
							max={200}
							step={1}
						/>
				</PanelBody>

				<PanelColorSettings
					title={__('Color Settings', 'pryvus-blocks')}
					colorSettings={[
						{
							value: iconColorValue,
							onChange: (newColor) => {
								if (newColor === undefined) {
									setAttributes({ iconColor: undefined, customIconColor: undefined });
								} else if (newColor.startsWith('var(--wp--preset--color--')) {
									const slug = newColor.match(/var\(--wp--preset--color--(.+?)\)/)?.[1];
									setAttributes({ iconColor: slug, customIconColor: undefined });
								} else {
									setAttributes({ iconColor: undefined, customIconColor: newColor });
								}
							},
							label: __('Icon Color', 'pryvus-blocks'),
						},
						{
							value: backgroundColorValue,
							onChange: (newColor) => {
								if (newColor === undefined) {
									setAttributes({ backgroundColor: undefined, customBackgroundColor: 'transparent' });
								} else if (newColor.startsWith('var(--wp--preset--color--')) {
									const slug = newColor.match(/var\(--wp--preset--color--(.+?)\)/)?.[1];
									setAttributes({ backgroundColor: slug, customBackgroundColor: undefined });
								} else {
									setAttributes({ backgroundColor: undefined, customBackgroundColor: newColor });
								}
							},
							label: __('Background Color', 'pryvus-blocks'),
						}
					]}
				/>

				<PanelBody title={__('Background Settings', 'pryvus-blocks')} initialOpen={false}>
					<RangeControl
						label={__('Background Size (px)', 'pryvus-blocks')}
							value={backgroundSize}
							onChange={(value) => setAttributes({ backgroundSize: value })}
							min={iconSize}
							max={300}
							step={1}
						/>
						<RangeControl
						label={__('Border Radius (px)', 'pryvus-blocks')}
							value={borderRadius}
							onChange={(value) => setAttributes({ borderRadius: value })}
							min={0}
							max={backgroundSize / 2}
							step={1}
						/>
					</PanelBody>

				<PanelBody title={__('Border Settings', 'pryvus-blocks')} initialOpen={false}>
					<ToggleControl
						label={__('Enable Border', 'pryvus-blocks')}
							checked={hasBorder}
							onChange={(value) => setAttributes({ hasBorder: value })}
						/>
						{hasBorder && (
							<>
								<RangeControl
								label={__('Border Width (px)', 'pryvus-blocks')}
									value={borderWidth}
									onChange={(value) => setAttributes({ borderWidth: value })}
									min={1}
									max={10}
									step={1}
								/>
							</>
						)}
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					<div style={iconContainerStyle}>
						<span className="material-symbols-outlined" style={iconStyle}>
							{icon}
						</span>
					</div>
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const {
			icon,
			iconSize,
			iconColor,
			customIconColor,
			backgroundColor,
			customBackgroundColor,
			backgroundSize,
			borderRadius,
			hasBorder,
			borderColor,
			borderWidth
		} = attributes;

		const iconColorValue = iconColor ? `var(--wp--preset--color--${iconColor})` : customIconColor || '#4C8DFF';
		const backgroundColorValue = backgroundColor ? `var(--wp--preset--color--${backgroundColor})` : customBackgroundColor || 'transparent';

		const blockProps = useBlockProps.save({
			className: 'pryvus-icon-block',
			style: {
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}
		});

		const iconContainerStyle = {
			width: `${backgroundSize}px`,
			height: `${backgroundSize}px`,
			backgroundColor: backgroundColorValue,
			borderRadius: `${borderRadius}px`,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			border: hasBorder ? `${borderWidth}px solid ${borderColor}` : 'none'
		};

		const iconStyle = {
			fontSize: `${iconSize}px`,
			color: iconColorValue
		};

		return (
			<div {...blockProps}>
				<div style={iconContainerStyle}>
					<span className="material-symbols-outlined" style={iconStyle}>
						{icon}
					</span>
				</div>
			</div>
		);
	}
});

console.log('Pryvus Icon block registered:', blockRegistration);
