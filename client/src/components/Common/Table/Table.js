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
import Typography from '@mui/material/Typography';

export const StyledText = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

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

  if (isFetching)
    return (
      <div style={{ width: '-webkit-fill-available' }} className="mt-[100px] flex justify-center">
        <Spinner center />
      </div>
    );

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
                const maxWidth = item[ARRAY_KEYS.MAX_WIDTH];

                return (
                  <StyledTableCell
                    align="center"
                    key={index}
                    style={maxWidth ? { maxWidth: maxWidth } : {}}
                    className={`${classes.borders} ${classes.fontSize14}`}>
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
                      const maxWidth = headers?.[rowIndex]?.[ARRAY_KEYS.MAX_WIDTH];

                      if (item === ARRAY_KEYS.DISPLAY_FN) {
                        const displayFn = row[ARRAY_KEYS.DISPLAY_FN]?.component;

                        return (
                          <StyledTableCell
                            align="center"
                            key={rowIndex}
                            className={` ${classes.borders} ${classes.fontSize14}`}
                            style={maxWidth ? { maxWidth: maxWidth } : {}}>
                            {displayFn}
                          </StyledTableCell>
                        );
                      }

                      const dataText = row[headers?.[rowIndex]?.[ARRAY_KEYS.VALUE]];

                      return (
                        <StyledTableCell
                          align="center"
                          key={rowIndex}
                          className={` ${classes.borders} ${classes.fontSize14}`}
                          style={maxWidth ? { maxWidth: maxWidth } : {}}>
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
