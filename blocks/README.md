# Pryvus Blocks

Custom blocks collection for the Pryvus theme.

## Structure

```
blocks/
├── icon/               # Icon block source
│   ├── block.json     # Block metadata
│   ├── index.js       # Block logic
│   ├── editor.scss    # Editor styles
│   └── style.scss     # Frontend styles
├── build/             # Compiled blocks
│   └── icon/          # Icon block compiled files
├── package.json       # Build configuration
└── node_modules/      # Dependencies
```

## Current Blocks

### Icon Block (`pryvus/icon`)
Display icons with customizable appearance:
- Icon selection (Material Symbols)
- Icon size, color
- Background color, size, border radius
- Optional border with width and color

## Adding a New Block

### 1. Create Block Directory

```bash
cd blocks
mkdir my-block
```

### 2. Create Block Files

**my-block/block.json:**
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "pryvus/my-block",
  "title": "My Block",
  "category": "widgets",
  "icon": "star-filled",
  "description": "Block description",
  "keywords": ["keyword1", "keyword2"],
  "version": "1.0.0",
  "textdomain": "pryvus-blocks",
  "supports": {
    "align": true
  },
  "attributes": {},
  "editorScript": "file:./index.js",
  "editorStyle": "file:./index.css",
  "style": "file:./style-index.css"
}
```

**my-block/index.js:**
```js
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import './editor.scss';

registerBlockType('pryvus/my-block', {
	edit: () => {
		const blockProps = useBlockProps();
		return <div {...blockProps}>My Block Editor</div>;
	},
	save: () => {
		const blockProps = useBlockProps.save();
		return <div {...blockProps}>My Block Frontend</div>;
	}
});
```

**my-block/editor.scss:**
```scss
.wp-block-pryvus-my-block {
	/* Editor styles */
}
```

**my-block/style.scss:**
```scss
.wp-block-pryvus-my-block {
	/* Frontend styles */
}
```

### 3. Update Build Configuration

Edit `package.json` to build multiple blocks:

```json
{
  "scripts": {
    "build": "wp-scripts build icon/index.js my-block/index.js --output-path=build",
    "start": "wp-scripts start icon/index.js my-block/index.js --output-path=build"
  }
}
```

### 4. Copy block.json After Build

```bash
npm run build
cp my-block/block.json build/my-block/
```

### 5. Register in functions.php

Add to `themes/pryvus_2026/functions.php`:

```php
function pryvus_2026_register_blocks() {
	register_block_type( get_theme_file_path( 'blocks/build/icon' ) );
	register_block_type( get_theme_file_path( 'blocks/build/my-block' ) );
}
```

## Development

### Install Dependencies

```bash
cd blocks
npm install
```

### Build for Production

```bash
npm run build
```

### Development Mode (watch)

```bash
npm run start
```

### Lint & Format

```bash
npm run lint:js
npm run lint:css
npm run format
```

## Notes

- All blocks share the same `node_modules` and build tools
- Each block compiles to `build/[block-name]/`
- Block metadata (`block.json`) must be copied to build directory manually after building
- Material Symbols font is already loaded by the theme
