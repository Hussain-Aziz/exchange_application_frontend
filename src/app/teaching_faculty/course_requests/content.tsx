'use client';
import React from 'react';
import DataTable from '../../../components/DataTable';
import { createStyledTableRow, createStyledTableCell } from '../../../components/StyledTableComponents';
import { TableCell, TableRow, styled } from '@mui/material';
import {useRouter} from 'next/navigation';

export default function CourseRequestSelectionContent({fetchData}: {fetchData: (pageNum: number, searchText: string) => Promise<any>}) {
  const columns = ["COURSE CODE", "COURSE NAME", "STUDENT ID", "STUDENT NAME"];

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

function CustomTableRow({data}: {data: any}) {
  const router = useRouter();

  const StyledTableRow = styled(TableRow)(createStyledTableRow())
  const StyledTableCell = styled(TableCell)(createStyledTableCell())

  const handleTableRowClick = () => {
    router.push(`/teaching_faculty/course_requests/${data.course_application_id}`);
  };

  return (
    <>
      <StyledTableRow onClick={handleTableRowClick}>
        <StyledTableCell id={`${data.course_application_id}`}>
          {data.course_code}
        </StyledTableCell>
        <StyledTableCell id={`${data.course_application_id}`}>
          {data.course_title}
        </StyledTableCell>
        <StyledTableCell id={`${data.course_application_id}`}>
          {data.student.aus_id}
        </StyledTableCell>
        <StyledTableCell id={`${data.course_application_id}`}>
          {data.student.name}
        </StyledTableCell>
      </StyledTableRow>
      <tr className="spacer" style={{ height: 15, padding: 0 }}><td colSpan={100}></td></tr>
    </>
  );
}