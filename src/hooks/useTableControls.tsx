import { useState, useEffect } from "react";

/**
 * Custom hook for managing table pagination and search
*/
export default function useTableControls(fetchData: (pageNum: number, searchText: string) => Promise<any>) {
    const [tableState, setTableState] = useState({
        searchText: "",
        pageNum: 1,
      });
      const [fetchedData, setFetchedData] = useState<any>(null);
    
      let maxPages = 0;
      let numDigits = 0;
      let rows = [];
      if (fetchedData !== null && fetchedData !== undefined) {
        maxPages = fetchedData.pagination.total_pages
        rows = fetchedData.models
        numDigits = maxPages.toString().length
      }
    
      useEffect(() => {
        const fetchNewData = async () => {
          setFetchedData(null);
          const data = await fetchData(tableState.pageNum, tableState.searchText);
          setFetchedData(data);
        }
    
        fetchNewData()
      }, [fetchData, tableState]);


      return [tableState, setTableState, fetchedData, maxPages, numDigits, rows]
}