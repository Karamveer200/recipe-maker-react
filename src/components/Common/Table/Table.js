/* eslint-disable no-unused-vars */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import classes from './Table.module.css';
import { ARRAY_KEYS } from '../../../utils/constants';
import Spinner from '../Spinner/Spinner';
import { isArray, isArrayReady } from '../../../utils/helperFunctions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#4f46e5',
    color: theme.palette.common.white,
    fontFamily: 'Montserrat',
    fontWeight: 700
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    color: theme.palette.common.white,
    fontWeight: 500
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#181f2e'
  },
  '&:nth-of-type(odd)': {
    backgroundColor: '#111827'
  },

  '&:hover': {
    backgroundColor: '#441f79',
    cursor: 'pointer',
    transition: 'all 100ms ease-in'
  },

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const TableData = ({ headers = [], bodyData = [], isFetching = false, onRowClick }) => {
  const isDataFound = isArray(bodyData);

  if (isFetching) return <Spinner center />;

  const Wrapper = ({ children }) => {
    return <>{children}</>;
  };

  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} aria-label="customized table" className="">
          <TableHead>
            <TableRow>
              {isArrayReady(headers)?.map((item, index) => {
                const minWidth = item[ARRAY_KEYS.MIN_WIDTH];

                return (
                  <StyledTableCell
                    align="center"
                    key={index}
                    style={minWidth ? { minWidth: minWidth } : {}}
                    className={`${classes.borders} ${classes.fontSize16}`}>
                    {item[ARRAY_KEYS.HEADER]}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          {isDataFound && (
            <TableBody>
              {bodyData.map((row, index) => {
                const rowsArray = Object.keys(row);

                return (
                  <StyledTableRow key={index} onClick={() => onRowClick?.(row)}>
                    {isArrayReady(rowsArray)?.map((item, rowIndex) => {
                      if (item === ARRAY_KEYS.DISPLAY_FN) {
                        const displayFn = row[ARRAY_KEYS.DISPLAY_FN]?.component;

                        return (
                          <StyledTableCell
                            align="center"
                            key={rowIndex}
                            className={` ${classes.borders} ${classes.fontSize14}`}>
                            {displayFn}
                          </StyledTableCell>
                        );
                      }

                      const dataText = row[headers?.[rowIndex]?.[ARRAY_KEYS.VALUE]];
                      return (
                        <StyledTableCell
                          align="center"
                          key={rowIndex}
                          className={` ${classes.borders} ${classes.fontSize14}`}>
                          {dataText}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {!isDataFound && <div className="w-full bg-transparent text-white m-7">No data found...</div>}
    </Wrapper>
  );
};

export default TableData;
