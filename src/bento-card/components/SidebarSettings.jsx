/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	ColorPicker,
	PanelBody,
	RangeControl,
	SelectControl,
} from '@wordpress/components';

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
		hoverGlowColor,
	} = attributes;
	const gridColumns = context[ 'bbx/bento-box-columns' ] || 2;
	const gridRows = context[ 'bbx/bento-box-rows' ] || 2;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Bento Card Settings', 'bbx-bento-box' ) }>
				<RangeControl
					label={ __( 'Column Span', 'bbx-bento-box' ) }
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
					label={ __( 'Row Span', 'bbx-bento-box' ) }
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
			<PanelBody title={ __( 'Hover Settings', 'bbx-bento-box' ) }>
				<SelectControl
					label={ __( 'Hover Effect', 'bbx-bento-box' ) }
					value={ hoverEffect }
					options={ [
						{ label: __( 'None', 'bbx-bento-box' ), value: 'none' },
						{
							label: __( 'Shadow', 'bbx-bento-box' ),
							value: 'shadow',
						},
						{
							label: __( 'Scale', 'bbx-bento-box' ),
							value: 'scale',
						},
						{
							label: __( 'Rotate', 'bbx-bento-box' ),
							value: 'rotate',
						},
						{
							label: __( '3D Lift', 'bbx-bento-box' ),
							value: '3d-lift',
						},
						{ label: __( 'Tilt', 'bbx-bento-box' ), value: 'tilt' },
						{ label: __( 'Glow', 'bbx-bento-box' ), value: 'glow' },
					] }
					onChange={ ( newHoverEffect ) => {
						setAttributes( { hoverEffect: newHoverEffect } );
					} }
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
				{ hoverEffect === 'rotate' && (
					<RangeControl
						label={ __( 'Rotation Degree', 'bbx-bento-box' ) }
						value={ rotationDegree }
						onChange={ ( newDegree ) =>
							setAttributes( { rotationDegree: newDegree } )
						}
						min={ 0 }
						max={ 360 }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				) }
				{ hoverEffect === 'scale' && (
					<RangeControl
						label={ __( 'Scale Factor', 'bbx-bento-box' ) }
						value={ scaleFactor }
						onChange={ ( newScale ) =>
							setAttributes( { scaleFactor: newScale } )
						}
						min={ 1 }
						max={ 2 }
						step={ 0.01 }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				) }
				{ hoverEffect === 'shadow' && (
					<>
						<RangeControl
							label={ __( 'Shadow Offset X', 'bbx-bento-box' ) }
							value={ shadowOffsetX }
							onChange={ ( newOffsetX ) =>
								setAttributes( { shadowOffsetX: newOffsetX } )
							}
							min={ -20 }
							max={ 20 }
						/>
						<RangeControl
							label={ __( 'Shadow Offset Y', 'bbx-bento-box' ) }
							value={ shadowOffsetY }
							onChange={ ( newOffsetY ) =>
								setAttributes( { shadowOffsetY: newOffsetY } )
							}
							min={ -20 }
							max={ 20 }
						/>
						<RangeControl
							label={ __( 'Shadow Blur', 'bbx-bento-box' ) }
							value={ shadowBlur }
							onChange={ ( newBlur ) =>
								setAttributes( { shadowBlur: newBlur } )
							}
							min={ 0 }
							max={ 20 }
						/>
						<RangeControl
							label={ __( 'Shadow Spread', 'bbx-bento-box' ) }
							value={ shadowSpread }
							onChange={ ( newSpread ) =>
								setAttributes( { shadowSpread: newSpread } )
							}
							min={ 0 }
							max={ 20 }
						/>
						<ColorPicker
							label={ __( 'Shadow Color', 'bbx-bento-box' ) }
							color={ hoverShadowColor }
							onChangeComplete={ ( color ) =>
								setAttributes( { hoverShadowColor: color.hex } )
							}
						/>
					</>
				) }
				{ hoverEffect === 'tilt' && (
					<RangeControl
						label={ __( 'Tilt Degree', 'bbx-bento-box' ) }
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
							label={ __( 'Glow Intensity', 'bbx-bento-box' ) }
							value={ glowIntensity }
							onChange={ ( newGlow ) =>
								setAttributes( { glowIntensity: newGlow } )
							}
							min={ 0 }
							max={ 20 }
							step={ 1 }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<ColorPicker
							label={ __( 'Glow Color', 'bbx-bento-box' ) }
							color={ hoverGlowColor }
							onChangeComplete={ ( color ) =>
								setAttributes( { hoverGlowColor: color.hex } )
							}
						/>
					</>
				) }
			</PanelBody>
		</InspectorControls>
	);
}
