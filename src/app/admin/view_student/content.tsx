'use client';
import React, { useEffect } from 'react';
import DataTable from '../../../components/DataTable';
import { createStyledTableRow, createStyledTableCell } from '../../../components/StyledTableComponents';
import { TableCell, TableRow, styled } from '@mui/material';
import {useRouter} from 'next/navigation';
import { PaginatedRequest } from '../../../constants/types/paginatedRequest';
import { Student } from '../../../constants/types/courseApplicationTypes';

export default function ViewStudentContent({fetchData}: {fetchData: (pageNum: number, searchText: string) => Promise<PaginatedRequest<Student>>}) {

   // force redirect to /faculty/home on back button click
   useEffect(() => {
    const forceToHome = function (event: any) {
      window.location.href = '/admin/home';
    }
    window.addEventListener('popstate', forceToHome);
    return () => {
      window.removeEventListener('popstate', forceToHome);
    }
  }, []);

  const columns = ["ID", "NAME", "MAJOR", "UNIVERSITY"]

  return (
    <div style={{maxWidth: '90%'}}>
      <DataTable 
        columns={columns}
        fetchData={fetchData}
        UserDataTableRow={CustomTableRow}
      />
    </div>
  );
}

export function CustomTableRow({data}: {data: Student}) {
  const router = useRouter();

  const StyledTableRow = styled(TableRow)(createStyledTableRow())
  const StyledTableCell = styled(TableCell)(createStyledTableCell())

  const handleTableRowClick = () => {
    router.push(`/admin/view_student/${data.aus_id}`);
  };

  return (
    <>
      <StyledTableRow onClick={handleTableRowClick}>
        <StyledTableCell id={`${data.user.username}`}>
          {data.aus_id}
        </StyledTableCell>
        <StyledTableCell id={`${data.user.username}`}>
          {data.name}
        </StyledTableCell>
        <StyledTableCell id={`${data.user.username}`}>
          {data.present_major}
        </StyledTableCell>
        <StyledTableCell id={`${data.user.username}`}>
          {data.university.university_name}
        </StyledTableCell>
      </StyledTableRow>
      <tr className="spacer" style={{ height: 15, padding: 0 }}><td colSpan={100}></td></tr>
    </>
  );
}