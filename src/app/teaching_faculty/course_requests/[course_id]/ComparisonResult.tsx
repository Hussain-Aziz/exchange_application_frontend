'use client';
import React from 'react';
import {
  Grid,
  Typography,
} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';


const sample =
{
  "Derive the time complexity of basic programs and algorithms to evaluate their performance when handling large amounts of data.": "Analyzing the time complexity of basic algorithms using big-O notation is covered in Course 2 (1).",
  "Implement Abstract Data Types (ADTs) such as vectors, lists, stacks, queues, trees, heaps, priority queues, hash tables, and graphs.": "Course 2 covers the use of basic data structures (arrays, linked lists, stacks, queues, trees, heaps, and hash tables) for storage and retrieval of data (2), which aligns with the objective but doesn't explicitly mention all the ADTs listed in Course 1.",
  "Develop programs that make use of one or more ADTs, using the C++ object-oriented programming language and the C++ Standard Library.": "The host university course covers using basic data structures for storage and retrieval (2), but it doesn't specifically mention C++ or the C++ Standard Library.",
  "Understand the use of recursion to process data structures and implement algorithms.": "Course 2 includes applying recursive programming in problem-solving (1), addressing the use of recursion in algorithms.",
  "Apply searching and sorting algorithms to solve computing problems effectively": "Course 2 covers selecting appropriate searching and sorting algorithms for a given application (2), aligning with the objective.",
  "match percentage": "83%",

  "prompt": `Act like you are a college professor who needs to compare the learning outcomes of two course syllabi and decide whether or not they are equivalent. To compare their similarity, you have to write bullet points for each of the learning outcomes in course 1 and explain in only 1-2 sentences whether or not they are achieved in course 2. The output must be in JSON format where the key is the course learning objective from course 1 and the value is the explanation. At the end, add a key to the json called "match percentage" and have its value be the percentage of learning outcomes from course 1 that matched
Course 1:
Upon completion of the course, students will be able to:
1. Derive the time complexity of basic programs and algorithms to evaluate their performance
when handling large amounts of data.
2. Implement Abstract Data Types (ADTs) such as vectors, lists, stacks, queues, trees, heaps, 
priority queues, hash tables, and graphs.
3. Develop programs that make use of one or more ADTs, using the C++ object-oriented 
programming language and the C++ Standard Library.
4. Understand the use of recursion to process data structures and implement algorithms.
5. Apply searching and sorting algorithms to solve computing problems effectively

Course 2:
On successful completion of this course, students should be able to:
1. Analyze the time complexity of basic algorithms using big-O notation. (1)
2. Apply recursive programming in problem solving. (1)
3. Use basic data structures (arrays, linked lists, stacks, queues,  trees, heaps, and hash tables) for storage and retrieval of data.  (2)
4. Select the appropriate searching and hashing algorithms for a given application. (2) 
5. Select the appropriate sorting algorithms for a given application. (2) 
6. Apply graph algorithms to solve engineering problems. (2) 7. Write, test, and debug computer program solutions to problems using learned data structures and algorithms.(7)
`
}

export default function ComparisonResult() {

  const color = sample['match percentage'] > '80%' ? 'green' : 
                sample['match percentage'] > '60%' ? undefined :
                                                    'red';

  return (
    <Grid container className="full-screen" sx={{ height: '400px' }}>
      <Grid item xs={12} className="login-background" sx={{height: '400px', overflow: 'auto'}}>
        <Typography variant="h4" sx={{ marginBottom: '10px', textAlign: 'center' }}>Comparison Result</Typography>
        <Typography variant="h6" sx={{ marginBottom: '20px', color: color, textAlign:'center' }}>{`Match: ${sample['match percentage']}`}</Typography>
        <Grid container>
          {
            Object.keys(sample).map((key: string, index: number) => {
              if (key === 'match percentage' || key === 'prompt') return;
              const value = sample[key as keyof typeof sample];
              return (
                <TableContainer key={index}>
                  <Table>
                    <TableBody>
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" style={{ width: '50%' }}>
                          <Typography variant="body1">{`CLO ${index}: ${key}`}</Typography>
                        </TableCell>
                        <TableCell align="justify" style={{ width: '50%' }}>
                          <Typography variant="body1">{value}</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              );
            })
          }
        </Grid>
      </Grid>
    </Grid>
  );
}