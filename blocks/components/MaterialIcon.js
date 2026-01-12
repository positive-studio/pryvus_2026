/**
 * Shared Material Icon Component
 * Reusable icon renderer with customizable styling
 */

export const MaterialIcon = ({ 
	icon = 'star',
	iconSize = 32,
	iconColor,
	customIconColor = '#4C8DFF',
	backgroundColor,
	customBackgroundColor = 'transparent',
	backgroundSize = 64,
	borderRadius = 50,
	hasBorder = false,
	borderColor = '#4C8DFF',
	borderWidth = 2,
	className = ''
}) => {
	const iconColorValue = iconColor 
		? `var(--wp--preset--color--${iconColor})` 
		: customIconColor;
	
	const backgroundColorValue = backgroundColor 
		? `var(--wp--preset--color--${backgroundColor})` 
		: customBackgroundColor;

	const containerStyle = {
		width: `${backgroundSize}px`,
		height: `${backgroundSize}px`,
		backgroundColor: backgroundColorValue,
		borderRadius: typeof borderRadius === 'string' ? borderRadius : `${borderRadius}px`,
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
		<div className={`pryvus-icon-container ${className}`} style={containerStyle}>
			<span className="material-symbols-outlined" style={iconStyle}>
				{icon}
			</span>
		</div>
	);
};

// Icon options list for quick selection
export const ICON_OPTIONS = [
	{ label: 'Star', value: 'star' },
	{ label: 'Rocket Launch', value: 'rocket_launch' },
	{ label: 'Lightbulb', value: 'lightbulb' },
	{ label: 'Search', value: 'search' },
	{ label: 'Architecture', value: 'architecture' },
	{ label: 'Code', value: 'code' },
	{ label: 'Build', value: 'build' },
	{ label: 'Design', value: 'design_services' },
	{ label: 'Analytics', value: 'analytics' },
	{ label: 'Verified', value: 'verified' },
	{ label: 'Security', value: 'security' },
	{ label: 'Speed', value: 'speed' },
	{ label: 'Cloud', value: 'cloud' },
	{ label: 'Dashboard', value: 'dashboard' },
	{ label: 'Settings', value: 'settings' },
	{ label: 'Shopping Cart', value: 'shopping_cart' },
	{ label: 'School', value: 'school' },
	{ label: 'Store', value: 'store' },
	{ label: 'Devices', value: 'devices' },
	{ label: 'Payments', value: 'payments' },
	{ label: 'Groups', value: 'groups' },
	{ label: 'Support', value: 'support_agent' },
	{ label: 'Check Circle', value: 'check_circle' }
];
