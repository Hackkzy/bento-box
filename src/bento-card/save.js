/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		rowSpan,
		colSpan,
		hoverEffect,
		rotationDegree,
		scaleFactor,
		shadowIntensity,
		tiltDegree,
		glowIntensity,
		hoverShadowColor,
		hoverGlowColor,
	} = attributes;

	return (
		<div
			{ ...useBlockProps.save( {
				className: `hover-${ hoverEffect }`,
				style: {
					'--bbx-card-rotation-degree': `${ rotationDegree }deg`,
					'--bbx-card-scale-factor': `${ scaleFactor }`,
					'--bbx-card-shadow-intensity': `${ shadowIntensity }px`,
					'--bbx-card-tilt-degree': `${ tiltDegree }deg`,
					'--bbx-card-glow-intensity': `${ glowIntensity }px`,
					'--bbx-card-hover-shadow-color': hoverShadowColor,
					'--bbx-card-hover-glow-color': hoverGlowColor,
					'--bbx-card-grid-row': `span ${ rowSpan }`,
					'--bbx-card-grid-column': `span ${ colSpan }`,
				},
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
