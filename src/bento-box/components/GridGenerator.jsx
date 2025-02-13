/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { ToolbarButton } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import DiceIcon from './DiceIcon';

export default function GridGenerator( { attributes, clientId } ) {
	const { gridColumns, gridRows } = attributes;
	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

	// Gets default theme colors.
	const baseColors = useSelect( ( select ) => {
		const settings = select( 'core/block-editor' )?.getSettings();
		return settings && Array.isArray( settings.colors )
			? settings.colors
			: [];
	}, [] );

	const handleRandomize = () => {
		const newTemplate = generateRandomLayout(
			gridRows,
			gridColumns,
			baseColors
		); // Pass gridRows, gridColumns
		replaceInnerBlocks( clientId, newTemplate, false );
	};

	return (
		<ToolbarButton
			icon={ DiceIcon }
			label={ __( 'Randomize grid', 'bbx-bento-box' ) }
			onClick={ handleRandomize }
		/>
	);
}

/**
 * Helper: Returns a random integer between min and max (inclusive).
 * @param {number} min - The minimum integer value.
 * @param {number} max - The maximum integer value.
 * @return {number} A random integer between min and max (inclusive).
 */
const randomInt = ( min, max ) =>
	Math.floor( Math.random() * ( max - min + 1 ) ) + min;

/**
 * Initializes a grid matrix (2D array) with the specified rows and columns.
 * All cells are set to 0 (meaning “free”).
 *
 * @param {number} rows - The number of rows in the grid.
 * @param {number} cols - The number of columns in the grid.
 * @return {Array<Array<number>>} A 2D array representing the grid,
 * where each cell is initialized to 0.
 */
const initializeGrid = ( rows, cols ) =>
	Array.from( { length: rows }, () => Array( cols ).fill( 0 ) );

/**
 * Checks if the cell at the specified row and column is free (i.e., equals 0).
 *
 * @param {Array<Array<number>>} grid - The grid to check, represented as a 2D array.
 * @param {number}               row  - The row index of the cell to check.
 * @param {number}               col  - The column index of the cell to check.
 * @return {boolean} True if the cell is free (0), otherwise false.
 */
const isCellFree = ( grid, row, col ) => grid[ row ][ col ] === 0;

/**
 * For a given starting cell (startRow, startCol), compute the maximum contiguous
 * free rectangle that starts at that cell.
 *
 * Returns an object with:
 *  - maxRowSpan: how many rows are free continuously starting at startRow.
 *  - maxColSpan: the maximum number of contiguous free columns across all those rows.
 *
 * @param {Array<Array<number>>} grid     - The grid to check, represented as a 2D array.
 * @param {number}               startRow - The starting row index for the search.
 * @param {number}               startCol - The starting column index for the search.
 * @return {{ maxRowSpan: number, maxColSpan: number }} An object containing the maximum
 * row span and column span of contiguous free cells starting from the specified cell.
 */
const getMaxAvailableSpan = ( grid, startRow, startCol ) => {
	const totalRows = grid.length;
	const totalCols = grid[ 0 ].length;
	let maxRowSpan = 0;
	let maxColSpan = Infinity;

	// Iterate row-by-row from the startRow.
	for ( let r = startRow; r < totalRows; r++ ) {
		// If the cell in the first column of the new row is occupied, stop.
		if ( ! isCellFree( grid, r, startCol ) ) {
			break;
		}
		maxRowSpan++;

		// Count contiguous free cells in the current row (starting at startCol).
		let currentRowFree = 0;
		for ( let c = startCol; c < totalCols; c++ ) {
			if ( isCellFree( grid, r, c ) ) {
				currentRowFree++;
			} else {
				break;
			}
		}
		// The maximum column span for the entire rectangle is limited by
		// the row with the fewest contiguous free cells.
		maxColSpan = Math.min( maxColSpan, currentRowFree );
	}

	return { maxRowSpan, maxColSpan };
};

/**
 * Marks a rectangular block in the grid as occupied (sets cells to 1).
 *
 * @param {Array<Array<number>>} grid     - The grid to update, represented as a 2D array.
 * @param {number}               startRow - The starting row index of the block to mark as occupied.
 * @param {number}               startCol - The starting column index of the block to mark as occupied.
 * @param {number}               rowSpan  - The number of rows to mark as occupied.
 * @param {number}               colSpan  - The number of columns to mark as occupied.
 */
const markGridOccupied = ( grid, startRow, startCol, rowSpan, colSpan ) => {
	for ( let r = startRow; r < startRow + rowSpan; r++ ) {
		for ( let c = startCol; c < startCol + colSpan; c++ ) {
			grid[ r ][ c ] = 1;
		}
	}
};

/**
 * For an unoccupied cell at (row, col), generate a random block that fits.
 * It calculates the maximum contiguous free rectangle starting at that cell,
 * then randomly chooses a rowSpan and colSpan within that rectangle.
 *
 * Returns an object containing block attributes.
 *
 * @param {Array<Array<number>>} grid             - The grid to check, represented as a 2D array.
 * @param {number}               row              - The row index of the starting cell for the block.
 * @param {number}               col              - The column index of the starting cell for the block.
 * @param {Array<string>}        backgroundColors - An array of background color slugs to choose from.
 * @return {{ rowSpan: number, colSpan: number, backgroundColor: string, gridRowStart: number, gridColumnStart: number }} An object containing the attributes of the generated block.
 */
const generateRandomBlockAt = ( grid, row, col, backgroundColors ) => {
	const { maxRowSpan, maxColSpan } = getMaxAvailableSpan( grid, row, col );
	if ( maxRowSpan === 0 || maxColSpan === 0 ) {
		// Should never happen since we check if the cell is free before calling.
		return null;
	}
	// Randomly choose block dimensions (at least 1 cell).
	const rowSpan = randomInt( 1, maxRowSpan );
	const colSpan = randomInt( 1, maxColSpan );
	const backgroundColor =
		backgroundColors[ randomInt( 0, backgroundColors.length - 1 ) ];

	return {
		rowSpan,
		colSpan,
		backgroundColor,
		gridRowStart: row + 1,
		gridColumnStart: col + 1,
	};
};

/**
 * Main function: Generates a random layout that fully tiles a grid.
 *
 * The algorithm scans the grid in row-major order. For each unoccupied cell,
 * it determines the maximum free rectangle available, chooses random block
 * dimensions within that free area, creates a block, and marks that region as occupied.
 *
 * Returns an array of blocks (using createBlock) with layout attributes.
 *
 * @param {number}        gridRows    - The number of rows in the grid.
 * @param {number}        gridColumns - The number of columns in the grid.
 * @param {Array<Object>} baseColors  - An array of color objects containing color slugs or hex codes.
 * @return {Array<Object>} An array of blocks created using WordPress's createBlock function,
 * each containing layout attributes.
 */
export const generateRandomLayout = ( gridRows, gridColumns, baseColors ) => {
	const grid = initializeGrid( gridRows, gridColumns );
	const backgroundColorsToUse =
		baseColors.length > 0
			? baseColors.map( ( color ) => color.slug ) // or use color.color if you prefer the hex code
			: [ 'accent-1', 'accent-2', 'accent-3', 'accent-4' ];

	const blocks = [];

	// Iterate over every cell in the grid.
	for ( let row = 0; row < gridRows; row++ ) {
		for ( let col = 0; col < gridColumns; col++ ) {
			// Skip cells already occupied by a previous block.
			if ( ! isCellFree( grid, row, col ) ) {
				continue;
			}

			// Generate a block at the current cell.
			const blockAttributes = generateRandomBlockAt(
				grid,
				row,
				col,
				backgroundColorsToUse
			);
			if ( blockAttributes ) {
				// Mark these cells as occupied.
				markGridOccupied(
					grid,
					row,
					col,
					blockAttributes.rowSpan,
					blockAttributes.colSpan
				);
				// Create the block using WordPress's createBlock.
				const block = createBlock( 'bbx/bento-card', blockAttributes );
				blocks.push( block );
			}
		}
	}

	return blocks;
};
