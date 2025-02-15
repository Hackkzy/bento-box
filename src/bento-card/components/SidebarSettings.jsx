/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';

export default function SidebarSettings( {
	attributes,
	setAttributes,
	context,
} ) {
	const {
		rowSpan,
		colSpan,
		hoverEffect,
		rotationDegree,
		scaleFactor,
		shadowOffsetX,
		shadowOffsetY,
		shadowBlur,
		shadowSpread,
		hoverShadowColor,
		tiltDegree,
		glowIntensity,
		hoverGlowColorPrimary,
		hoverGlowColorSecondary,
	} = attributes;
	const gridColumns = context[ 'bbx/bento-box-columns' ] || 2;
	const gridRows = context[ 'bbx/bento-box-rows' ] || 2;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Bento Card Settings', 'bento-box' ) }>
				<RangeControl
					label={ __( 'Column Span', 'bento-box' ) }
					value={ colSpan }
					onChange={ ( newColSpan ) => {
						setAttributes( { colSpan: newColSpan } );
					} }
					min={ 1 }
					max={ gridColumns }
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
				<RangeControl
					label={ __( 'Row Span', 'bento-box' ) }
					value={ rowSpan }
					onChange={ ( newRowSpan ) => {
						setAttributes( { rowSpan: newRowSpan } );
					} }
					min={ 1 }
					max={ gridRows }
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
			</PanelBody>
			<PanelBody title={ __( 'Hover Settings', 'bento-box' ) }>
				<SelectControl
					label={ __( 'Hover Effect', 'bento-box' ) }
					value={ hoverEffect }
					options={ [
						{ label: __( 'None', 'bento-box' ), value: 'none' },
						{
							label: __( 'Shadow', 'bento-box' ),
							value: 'shadow',
						},
						{
							label: __( 'Scale', 'bento-box' ),
							value: 'scale',
						},
						{
							label: __( 'Rotate', 'bento-box' ),
							value: 'rotate',
						},
						{ label: __( 'Tilt', 'bento-box' ), value: 'tilt' },
						{ label: __( 'Glow', 'bento-box' ), value: 'glow' },
					] }
					onChange={ ( newHoverEffect ) => {
						setAttributes( { hoverEffect: newHoverEffect } );
					} }
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
				{ hoverEffect === 'rotate' && (
					<RangeControl
						label={ __( 'Rotation Degree', 'bento-box' ) }
						value={ rotationDegree }
						onChange={ ( newDegree ) =>
							setAttributes( { rotationDegree: newDegree } )
						}
						min={ 0 }
						max={ 20 }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				) }
				{ hoverEffect === 'scale' && (
					<RangeControl
						label={ __( 'Scale Factor', 'bento-box' ) }
						value={ scaleFactor }
						onChange={ ( newScale ) =>
							setAttributes( { scaleFactor: newScale } )
						}
						min={ 1 }
						max={ 1.1 }
						step={ 0.01 }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				) }
				{ hoverEffect === 'shadow' && (
					<>
						<RangeControl
							label={ __( 'Shadow Offset X', 'bento-box' ) }
							value={ shadowOffsetX }
							onChange={ ( newOffsetX ) =>
								setAttributes( { shadowOffsetX: newOffsetX } )
							}
							min={ -20 }
							max={ 20 }
						/>
						<RangeControl
							label={ __( 'Shadow Offset Y', 'bento-box' ) }
							value={ shadowOffsetY }
							onChange={ ( newOffsetY ) =>
								setAttributes( { shadowOffsetY: newOffsetY } )
							}
							min={ -20 }
							max={ 20 }
						/>
						<RangeControl
							label={ __( 'Shadow Blur', 'bento-box' ) }
							value={ shadowBlur }
							onChange={ ( newBlur ) =>
								setAttributes( { shadowBlur: newBlur } )
							}
							min={ 0 }
							max={ 20 }
						/>
						<RangeControl
							label={ __( 'Shadow Spread', 'bento-box' ) }
							value={ shadowSpread }
							onChange={ ( newSpread ) =>
								setAttributes( { shadowSpread: newSpread } )
							}
							min={ 0 }
							max={ 20 }
						/>
						<PanelColorSettings
							colorSettings={ [
								{
									value: hoverShadowColor,
									label: __( 'Shadow Color', 'bento-box' ),
									onChange: ( newColor ) =>
										setAttributes( {
											hoverShadowColor: newColor,
										} ),
								},
							] }
						/>
					</>
				) }
				{ hoverEffect === 'tilt' && (
					<RangeControl
						label={ __( 'Tilt Degree', 'bento-box' ) }
						value={ tiltDegree }
						onChange={ ( newTilt ) =>
							setAttributes( { tiltDegree: newTilt } )
						}
						min={ 0 }
						max={ 45 }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				) }
				{ hoverEffect === 'glow' && (
					<>
						<RangeControl
							label={ __( 'Glow Intensity', 'bento-box' ) }
							value={ glowIntensity }
							onChange={ ( newGlow ) =>
								setAttributes( { glowIntensity: newGlow } )
							}
							min={ 5 }
							max={ 50 }
							step={ 1 }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<PanelColorSettings
							title={ __( 'Glow Colors', 'bento-box' ) }
							colorSettings={ [
								{
									value: hoverGlowColorPrimary,
									label: __( 'Primary', 'bento-box' ),
									onChange: ( newColor ) =>
										setAttributes( {
											hoverGlowColorPrimary: newColor,
										} ),
								},
								{
									value: hoverGlowColorSecondary,
									label: __( 'Secondary', 'bento-box' ),
									onChange: ( newColor ) =>
										setAttributes( {
											hoverGlowColorSecondary: newColor,
										} ),
								},
							] }
						/>
					</>
				) }
			</PanelBody>
		</InspectorControls>
	);
}
