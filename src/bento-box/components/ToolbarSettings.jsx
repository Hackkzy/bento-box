/**
 * WordPress dependencies
 */
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';

/**
 * Internal dependencies
 */
import GridGenerator from './GridGenerator';

export default function ToolbarSettings( {
	attributes,
	setAttributes,
	clientId,
} ) {
	return (
		<BlockControls>
			<ToolbarGroup>
				<GridGenerator
					attributes={ attributes }
					setAttributes={ setAttributes }
					clientId={ clientId }
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}
