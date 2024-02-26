'use client';
import React, { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { CircularProgress } from '@mui/material';
import TableControls from './TableControls';
import { createStyledTableCell } from './StyledTableComponents';
import useTableControls from '../hooks/useTableControls';

/*
 * Renders a table component with the given columns and gets the data from the endpoint provided and displays them using the given row component
 * Also adds a table controls component on the top and allows selecting users
 * Additionally supports a toggle option which can be used to switch endpoints
 */
export default function DataTable({
  columns,
  endpoint,
  UserDataTableRow
}:
{
  columns: string[],
  endpoint: string,
  UserDataTableRow: any,
}
) {

  const [tableState, setTableState, fetchedData, maxPages, numDigits, rows] = useTableControls(endpoint)

  // creates prestyled Material UI component
  const StyledTableCell = useMemo(() => styled(TableCell)(createStyledTableCell()), []);

  return (
    <>
      <TableControls
        maxPages={maxPages}
        numDigits={numDigits}
        tableState={tableState}
        setTableState={setTableState}
      />
      {fetchedData === null
        ?
        <div className='VTopHCenterContainer' style={{ width: '100%' }}>
          <CircularProgress />
        </div>
        :
        fetchedData === undefined
          ?
          <div className='VTopHCenterContainer' style={{ width: '100%' }}>
            <Typography variant='h6'>Error occured when fetching data from server</Typography>
          </div>
          :
          <Paper>
            <TableContainer style={{overflowX: undefined}}>
              <Table>
                <TableHead>
                  <TableRow style={{ padding: '10px' }}>
                    {columns.map((col) => {
                      return (<StyledTableCell style={{ padding: '10px', backgroundColor: '#efefef' }} key={col}>{col}</StyledTableCell>)
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((data:any) => {
                    return (
                      <UserDataTableRow
                        key={data.id}
                        data={data}
                      />
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
      }
    </>
  )
}

export interface TableState {
  pageNum: number;
  searchText: string;
}