/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './style.scss';

const blockIcon = (
	<svg
		width={ 800 }
		height={ 800 }
		viewBox="0 0 48 48"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect x={ 5.5 } y={ 26 } width={ 16.5 } height={ 16.5 } rx={ 2 } />
		<path d="M5.5 39.963H22" />
		<rect x={ 5.5 } y={ 5.5 } width={ 16.5 } height={ 16.5 } rx={ 2 } />
		<path d="M5.5 19.463H22" />
		<rect x={ 5.5 } y={ 26 } width={ 16.5 } height={ 16.5 } rx={ 2 } />
		<path d="M5.5 39.963H22" />
		<rect x={ 5.5 } y={ 5.5 } width={ 16.5 } height={ 16.5 } rx={ 2 } />
		<path d="M5.5 19.463H22" />
		<rect x={ 26 } y={ 5.5 } width={ 16.5 } height={ 16.5 } rx={ 2 } />
		<path d="M26 19.463h16.5" />
	</svg>
);

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * Block Icon.
	 */
	icon: blockIcon,

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
