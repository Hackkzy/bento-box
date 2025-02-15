/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
/* eslint-disable @wordpress/no-unsafe-wp-apis */
import {
	Panel,
	PanelBody,
	RangeControl,
	ToggleControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
/* eslint-enable @wordpress/no-unsafe-wp-apis */

export default function SidebarSettings( { attributes, setAttributes } ) {
	const { gridColumns, gridRows, gridGap, enableBlurEffect } = attributes;

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title={ __( 'Grid Settings', 'bbx-bento-box' ) }>
					<RangeControl
						label={ __( 'Number of Columns', 'bbx-bento-box' ) }
						value={ gridColumns }
						onChange={ ( val ) =>
							setAttributes( { gridColumns: val } )
						}
						min={ 1 }
						max={ 6 }
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
					<RangeControl
						label={ __( 'Number of Rows', 'bbx-bento-box' ) }
						value={ gridRows }
						onChange={ ( val ) =>
							setAttributes( { gridRows: val } )
						}
						min={ 1 }
						max={ 6 }
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
					<UnitControl
						label={ __( 'Grid Gap', 'bbx-bento-box' ) }
						value={ gridGap }
						onChange={ ( val ) =>
							setAttributes( { gridGap: val } )
						}
						step={ 1 }
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
					<ToggleControl
						label={ __( 'Focus on Hovered Card', 'bbx-bento-box' ) }
						checked={ enableBlurEffect }
						onChange={ ( value ) =>
							setAttributes( { enableBlurEffect: value } )
						}
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
