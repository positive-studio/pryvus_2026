<?php

/**
 * Pryvus 2026 functions and definitions
 *
 * @package Pryvus_2026
 * @since 1.0.0
 */

if (! function_exists('pryvus_2026_support')) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 */
	function pryvus_2026_support()
	{
		// Add support for block styles.
		add_theme_support('wp-block-styles');

		// Enqueue editor styles.
		add_editor_style('style.css');
	}
endif;

add_action('after_setup_theme', 'pryvus_2026_support');

if (! function_exists('pryvus_2026_styles')) :
	/**
	 * Enqueue styles.
	 */
	function pryvus_2026_styles()
	{
		// Register theme stylesheet.
		wp_register_style(
			'pryvus-2026-style',
			get_stylesheet_directory_uri() . '/style.css',
			array(),
			wp_get_theme()->get('Version')
		);

		// Enqueue theme stylesheet.
		wp_enqueue_style('pryvus-2026-style');

		// Enqueue Material Symbols icons.
		wp_enqueue_style(
			'material-symbols',
			'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0',
			array(),
			null
		);

		// Enqueue projects block frontend script
		wp_enqueue_script(
			'pryvus-projects-frontend',
			get_template_directory_uri() . '/blocks/projects/frontend.js',
			array(),
			wp_get_theme()->get('Version'),
			true
		);

		// Enqueue projects filter script on projects category page
		if (is_category('projects')) {
			wp_enqueue_script(
				'pryvus-projects-filter',
				get_template_directory_uri() . '/assets/js/projects-filter.js',
				array(),
				wp_get_theme()->get('Version'),
				true
			);
		}
	}
endif;

add_action('wp_enqueue_scripts', 'pryvus_2026_styles');

/**
 * Enqueue editor styles and scripts.
 */
function pryvus_2026_editor_assets()
{
	// Enqueue Material Symbols icons for editor.
	wp_enqueue_style(
		'material-symbols-editor',
		'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0',
		array(),
		null
	);
}
add_action('enqueue_block_editor_assets', 'pryvus_2026_editor_assets');

/**
 * Register block patterns.
 */
function pryvus_2026_register_patterns()
{
	// Register pattern category.
	register_block_pattern_category(
		'pryvus-heroes',
		array('label' => __('Pryvus Heroes', 'pryvus-2026'))
	);
}
add_action('init', 'pryvus_2026_register_patterns');

/**
 * Register custom blocks.
 */
function pryvus_2026_register_blocks()
{
	$blocks_names = array('icon', 'steps', 'projects');
	// Register blocks from build directory
	$blocks_dir = get_template_directory() . '/blocks/build';

	foreach ($blocks_names as $block_name) {
		if (file_exists($blocks_dir . '/' . $block_name . '/block.json')) {
			$projects_block = register_block_type($blocks_dir . '/' . $block_name);
			error_log('Projects block path: ' . $blocks_dir . '/' . $block_name);
			error_log('Projects block registered: ' . ($projects_block ? 'YES' : 'NO'));
		} else {
			error_log('Projects block.json not found at: ' . $blocks_dir . '/' . $block_name . '/block.json');
		}
	}
}
add_action('init', 'pryvus_2026_register_blocks');

/**
 * Theme update checker.
 * Checks for theme updates from a custom server.
 */
function pryvus_2026_check_for_update($transient)
{
	if (empty($transient->checked)) {
		return $transient;
	}

	// Theme information
	$theme_slug = 'pryvus_2026';
	$current_theme = wp_get_theme($theme_slug);
	$current_version = $current_theme->get('Version');

	// Update server URL - GitHub releases
	// Replace YOUR_USERNAME with your GitHub username or organization
	$update_url = 'https://github.com/YOUR_USERNAME/Pryvus/releases/latest/download/update-info.json';

	// Check for updates
	$remote = wp_remote_get(
		$update_url,
		array(
			'timeout' => 10,
			'headers' => array(
				'Accept' => 'application/json'
			)
		)
	);

	if (
		is_wp_error($remote) ||
		200 !== wp_remote_retrieve_response_code($remote) ||
		empty(wp_remote_retrieve_body($remote))
	) {
		return $transient;
	}

	$remote_data = json_decode(wp_remote_retrieve_body($remote));

	if (
		!$remote_data ||
		!isset($remote_data->version) ||
		!isset($remote_data->package)
	) {
		return $transient;
	}

	// Compare versions
	if (version_compare($current_version, $remote_data->version, '<')) {
		$transient->response[$theme_slug] = array(
			'theme'       => $theme_slug,
			'new_version' => $remote_data->version,
			'url'         => isset($remote_data->url) ? $remote_data->url : '',
			'package'     => $remote_data->package,
		);
	}

	return $transient;
}
add_filter('pre_set_site_transient_update_themes', 'pryvus_2026_check_for_update');

/**
 * Add theme update information to the theme details.
 */
function pryvus_2026_theme_update_info($false, $action, $response)
{
	if ('theme_information' !== $action) {
		return $false;
	}

	if (empty($response->slug) || 'pryvus_2026' !== $response->slug) {
		return $false;
	}

	// Update server URL - GitHub releases
	$update_url = 'https://github.com/YOUR_USERNAME/Pryvus/releases/latest/download/update-info.json';

	$remote = wp_remote_get(
		$update_url,
		array(
			'timeout' => 10,
			'headers' => array(
				'Accept' => 'application/json'
			)
		)
	);

	if (
		is_wp_error($remote) ||
		200 !== wp_remote_retrieve_response_code($remote) ||
		empty(wp_remote_retrieve_body($remote))
	) {
		return $false;
	}

	$remote_data = json_decode(wp_remote_retrieve_body($remote));

	if (!$remote_data) {
		return $false;
	}

	return (object) array(
		'name'          => isset($remote_data->name) ? $remote_data->name : 'Pryvus 2026',
		'slug'          => 'pryvus_2026',
		'version'       => isset($remote_data->version) ? $remote_data->version : '',
		'author'        => isset($remote_data->author) ? $remote_data->author : 'Pryvus',
		'homepage'      => isset($remote_data->homepage) ? $remote_data->homepage : 'https://pryvus.com',
		'requires'      => isset($remote_data->requires) ? $remote_data->requires : '6.4',
		'tested'        => isset($remote_data->tested) ? $remote_data->tested : '6.7',
		'requires_php'  => isset($remote_data->requires_php) ? $remote_data->requires_php : '8.0',
		'download_link' => isset($remote_data->package) ? $remote_data->package : '',
		'sections'      => array(
			'description' => isset($remote_data->description) ? $remote_data->description : '',
			'changelog'   => isset($remote_data->changelog) ? $remote_data->changelog : '',
		),
	);
}
add_filter('themes_api', 'pryvus_2026_theme_update_info', 10, 3);
