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
		hoverGlowColorPrimary,
		hoverGlowColorSecondary,
		shadowOffsetX,
		shadowOffsetY,
		shadowBlur,
		shadowSpread,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `hover-${ hoverEffect }`,
		style: {
			'--bbx-card-rotation-degree': `${ rotationDegree }deg`,
			'--bbx-card-scale-factor': `${ scaleFactor }`,
			'--bbx-card-tilt-degree': `${ tiltDegree }deg`,
			'--bbx-card-glow-intensity': `${ glowIntensity }px`,
			'--bbx-card-hover-shadow-color': hoverShadowColor,
			'--bbx-card-hover-glow-color-primary': hoverGlowColorPrimary,
			'--bbx-card-hover-glow-color-secondary': hoverGlowColorSecondary,
			'--bbx-card-grid-row': `span ${ rowSpan }`,
			'--bbx-card-grid-column': `span ${ colSpan }`,
			'--bbx-card-shadow-offset-x': `${ shadowOffsetX }px`,
			'--bbx-card-shadow-offset-y': `${ shadowOffsetY }px`,
			'--bbx-card-shadow-blur': `${ shadowBlur }px`,
			'--bbx-card-shadow-spread': `${ shadowSpread }px`,
		},
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
