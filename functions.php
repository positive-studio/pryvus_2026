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
