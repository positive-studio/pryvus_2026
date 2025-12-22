<?php
/**
 * Pryvus 2026 functions and definitions
 *
 * @package Pryvus_2026
 * @since 1.0.0
 */

if ( ! function_exists( 'pryvus_2026_support' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 */
	function pryvus_2026_support() {
		// Add support for block styles.
		add_theme_support( 'wp-block-styles' );

		// Enqueue editor styles.
		add_editor_style( 'style.css' );
	}
endif;

add_action( 'after_setup_theme', 'pryvus_2026_support' );

if ( ! function_exists( 'pryvus_2026_styles' ) ) :
	/**
	 * Enqueue styles.
	 */
	function pryvus_2026_styles() {
		// Register theme stylesheet.
		wp_register_style(
			'pryvus-2026-style',
			get_stylesheet_directory_uri() . '/style.css',
			array(),
			wp_get_theme()->get( 'Version' )
		);

		// Enqueue theme stylesheet.
		wp_enqueue_style( 'pryvus-2026-style' );
	}
endif;

add_action( 'wp_enqueue_scripts', 'pryvus_2026_styles' );
