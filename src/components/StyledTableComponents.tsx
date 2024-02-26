import { createStyles } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material';

/**
 * Creates styles for a Material UI TableRow. Removes the border and make the cursor into clickable icon when hovering over a row
 */

export function createStyledTableRow() {
  return createStyles(({ theme }: {theme: any}) => ({
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    '&': {
      cursor: 'pointer',
    },
  }));
}
/**
 * Creates styles for a Material UI TableCell with different styling for head and body cells.
 * Head cells will have a color, fontsize, padding, border and alignment changed
 * Body cells will have border radius, fontsize, background color, alignment and border changed
 */

export function createStyledTableCell() {
  return createStyles(({ theme }: {theme: any}) => ({
    [`&.${tableCellClasses.head}`]: {
      color: '#2f3337',
      fontSize: 12,
      padding: 10,
      verticalAlign: 'bottom',
      borderBottom: 0,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: 10,
      backgroundColor: 'white',
      verticalAlign: 'middle',
      borderBottom: 0,
    },
    
    [`&.${tableCellClasses.body}:last-child`]: {
      padding: 5
    },
  }
  ));
}