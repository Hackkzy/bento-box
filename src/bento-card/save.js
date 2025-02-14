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
		tiltDegree,
		glowIntensity,
		hoverShadowColor,
		hoverGlowColor,
		shadowOffsetX,
		shadowOffsetY,
		shadowBlur,
		shadowSpread,
	} = attributes;

	return (
		<div
			{ ...useBlockProps.save( {
				className: `hover-${ hoverEffect }`,
				style: {
					'--bbx-card-rotation-degree': `${ rotationDegree }deg`,
					'--bbx-card-scale-factor': `${ scaleFactor }`,
					'--bbx-card-tilt-degree': `${ tiltDegree }deg`,
					'--bbx-card-glow-intensity': `${ glowIntensity }px`,
					'--bbx-card-hover-shadow-color': hoverShadowColor,
					'--bbx-card-hover-glow-color': hoverGlowColor,
					'--bbx-card-grid-row': `span ${ rowSpan }`,
					'--bbx-card-grid-column': `span ${ colSpan }`,
					'--bbx-card-shadow-offset-x': `${ shadowOffsetX }px`,
					'--bbx-card-shadow-offset-y': `${ shadowOffsetY }px`,
					'--bbx-card-shadow-blur': `${ shadowBlur }px`,
					'--bbx-card-shadow-spread': `${ shadowSpread }px`,
				},
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
