/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import SidebarSettings from './components/SidebarSettings';
import ToolbarSettings from './components/ToolbarSettings';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { gridColumns, gridRows, gridGap, enableBlurEffect } = attributes;

	// Block props with styles and classes
	const blockProps = useBlockProps( {
		className: enableBlurEffect ? 'enable-blur' : '',
		style: {
			'--bbx-box-grid-template-columns': `repeat(${ gridColumns }, 1fr)`,
			'--bbx-box-grid-template-rows': `repeat(${ gridRows }, 1fr)`,
			'--bbx-box-grid-gap': gridGap,
		},
	} );

	// Gets inner blocks array)
	const innerBlocks = useSelect(
		( select ) =>
			select( 'core/block-editor' ).getBlock( clientId ).innerBlocks,
		[ clientId ]
	);

	const appenderToUse =
		innerBlocks.length < 1 ? InnerBlocks.ButtonBlockAppender : '';

	const innerBlockProps = useInnerBlocksProps( blockProps, {
		renderAppender: appenderToUse,
	} );

	return (
		<>
			<ToolbarSettings
				attributes={ attributes }
				setAttributes={ setAttributes }
				clientId={ clientId }
			/>
			<SidebarSettings
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div { ...innerBlockProps }>{ innerBlockProps.children }</div>
		</>
	);
}
