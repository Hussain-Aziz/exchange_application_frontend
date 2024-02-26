import {
  InputAdornment,
  TextField,
  IconButton, 
} from '@mui/material';
import {
  Search as SearchIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { TableState } from './DataTable';
/**
 * Renders the table controls component with the search bar and the pagination.
 */
export default function TableControls({
    tableState,
    setTableState,
    maxPages,
    numDigits,
}:
{
    tableState: TableState,
    setTableState: React.Dispatch<React.SetStateAction<TableState>>,
    maxPages: number,
    numDigits: number,
}) {
    const handleSearchTextChange = (event: any) => {
        setTableState({
          pageNum: 1,
          searchText: event.target.value,
        })
      };
    
      const handleInputChange = (e: any) => {
        const page = parseInt(e.target.value, 10);
        if (!isNaN(page) && page >= 1 && page <= maxPages) {
          setTableState(tableState => {return {...tableState, pageNum: page}})
        }
      };
    
      const handlePrevPage = () => {
        if (tableState.pageNum > 1) {
          setTableState(tableState => {return {...tableState, pageNum: tableState.pageNum - 1}})
        }
      };
    
      const handleNextPage = () => {
        if (tableState.pageNum < maxPages) {
          setTableState(tableState => {return {...tableState, pageNum: tableState.pageNum + 1}})
        }
      };
    
      const handleInputClick = (e: any) => {
        e.target.select();
      };


    return <div style={{ position: 'sticky', top: '0px', display: 'grid', gridTemplateColumns: '10fr 10fr 1fr', paddingBottom: 10, zIndex: '2' }}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'start', paddingLeft: '20px' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={tableState.searchText}
          onChange={handleSearchTextChange}
          style={{ justifySelf: 'left', width: '50%', marginTop: 10 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }} />
      </div>
      <div></div>
      {maxPages !== 0 &&
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textWrap: 'nowrap' }}>
          <IconButton onClick={handlePrevPage} disabled={tableState.pageNum === 1}>
            <ChevronLeftIcon />
          </IconButton>
  
          <input
            type="text"
            pattern='[0-9]*'
            value={tableState.pageNum}
            onChange={handleInputChange}
            onClick={handleInputClick}
            min={1}
            max={maxPages}
            style={{ backgroundColor: '#efefef', border: 'none', textAlign: 'left', width: 10 + 6 * numDigits }} />
  
          <p style={{ textAlign: 'center', margin: '0px', textWrap: 'nowrap' }}>{' '.repeat(numDigits) + "/" + '  '.repeat(numDigits) + maxPages}</p>
  
          <IconButton onClick={handleNextPage} disabled={tableState.pageNum === maxPages}>
            <ChevronRightIcon />
          </IconButton>
        </div>}
    </div>;
  }

