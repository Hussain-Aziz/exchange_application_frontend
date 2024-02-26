import { useState, useEffect } from "react";
import fetchUserData from "../constants/fetchUserData";

/**
 * Custom hook for managing table pagination and search
*/
export default function useTableControls(endpoint: string) {
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
          const data = await fetchUserData(tableState.pageNum, tableState.searchText, endpoint);
          setFetchedData(data);
        }
    
        fetchNewData()
      }, [endpoint, tableState]);


      return [tableState, setTableState, fetchedData, maxPages, numDigits, rows]
}