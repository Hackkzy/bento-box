/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import SidebarSettings from './components/SidebarSettings';

export default function Edit( { attributes, setAttributes, context } ) {
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

	const blockProps = useBlockProps( {
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
	} );

	const TEMPLATE = [
		[ 'core/image' ],
		[
			'core/paragraph',
			{ placeholder: __( 'Add card content here…', 'bbx-bento-box' ) },
		],
	];

	return (
		<>
			<SidebarSettings
				attributes={ attributes }
				setAttributes={ setAttributes }
				context={ context }
			/>
			<div { ...blockProps }>
				<InnerBlocks template={ TEMPLATE } />
			</div>
		</>
	);
}
