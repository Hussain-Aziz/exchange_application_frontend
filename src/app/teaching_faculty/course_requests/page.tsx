'use client';
import React from 'react';
import DataTable from '../../../components/DataTable';
import { createStyledTableRow, createStyledTableCell } from '../../../components/StyledTableComponents';
import { TableCell, TableRow, styled } from '@mui/material';
import {useRouter} from 'next/navigation';

export default function Page() {
  const columns = ["COURSE CODE", "COURSE NAME", "STUDENT ID", "STUDENT NAME"];

  return (
    <div style={{maxWidth: '90%'}}>
      <DataTable 
        columns={columns}
        endpoint={'list_users'}
        UserDataTableRow={CustomTableRow}
      />
    </div>
  );
}

function CustomTableRow({data}: {data: any}) {
  const router = useRouter();

  const StyledTableRow = styled(TableRow)(createStyledTableRow())
  const StyledTableCell = styled(TableCell)(createStyledTableCell())

  const handleTableRowClick = () => {
    router.push(`/teaching_faculty/course_requests/${data.id}`);
  };

  return (
    <>
      <StyledTableRow onClick={handleTableRowClick}>
        <StyledTableCell id={`${data.id}`}>
          {data.course_code}
        </StyledTableCell>
        <StyledTableCell id={`${data.id}`}>
          {data.course_name}
        </StyledTableCell>
        <StyledTableCell id={`${data.id}`}>
          {data.student_id}
        </StyledTableCell>
        <StyledTableCell id={`${data.id}`}>
          {data.student_name}
        </StyledTableCell>
      </StyledTableRow>
      <tr className="spacer" style={{ height: 15, padding: 0 }}><td colSpan={100}></td></tr>
    </>
  );
}