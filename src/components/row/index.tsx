import React, { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Customer, Transaction } from '../../types/types';

interface RowProps {
  row: Customer & { transactions: Transaction[] };
}

const Row: React.FC<RowProps> = ({ row }) => {
  console.log("row:", row)
  const [open, setOpen] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Name} {row.Surname}
        </TableCell>
        <TableCell>{row.BirthDate}</TableCell>
        <TableCell>{row.GSMNumber}</TableCell>
        <TableCell>
          {showCardNumber ? row.CardNumber : '**** **** **** ' + row.CardNumber.slice(-4)}
          <IconButton onClick={() => setShowCardNumber(!showCardNumber)}>
            {showCardNumber ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Transactions
              </Typography>
              <Table size="small" aria-label="transactions">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.transactions.length > 0 ? (
                    row.transactions.map(transaction => (
                      <TableRow key={transaction.TransactionID}>
                        <TableCell component="th" scope="row">
                          {transaction.TransactionDate}
                        </TableCell>
                        <TableCell align="right">{transaction.TransactionAmount}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        No transactions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;