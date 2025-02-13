/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { gridColumns, gridRows, gridGap, enableBlurEffect } = attributes;
	return (
		<div
			{ ...useBlockProps.save( {
				className: `${ enableBlurEffect ? 'enable-blur' : '' }`,
				style: {
					'--bbx-box-grid-template-columns': `repeat(${ gridColumns }, 1fr)`,
					'--bbx-box-grid-template-rows': `repeat(${ gridRows }, 1fr)`,
					'--bbx-box-grid-gap': gridGap,
				},
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
