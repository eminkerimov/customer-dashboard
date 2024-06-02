// CollapsibleTable.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Row from '../../components/row/index';
import Pagination from '@mui/material/Pagination';
import { filterCustomers } from '../../redux/reducers/customersReducer';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchCustomers } from '../../redux/actions/customersActions';
import { fetchTransactions } from '../../redux/actions/transactionsActions';

const CollapsibleTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector((state: RootState) => state.customers.filteredCustomers);
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const loadingCustomers = useSelector((state: RootState) => state.customers.loading);
  const loadingTransactions = useSelector((state: RootState) => state.transactions.loading);
  const errorCustomers = useSelector((state: RootState) => state.customers.error);
  const errorTransactions = useSelector((state: RootState) => state.transactions.error);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(filterCustomers(searchQuery));
  };

  const getCustomerTransactions = (customerID: string) => {
    return transactions.filter(t => t.CustomerID === customerID);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const rowsPerPage = 5;
  const lastIndex = page * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const paginatedCustomers = customers.slice(firstIndex, lastIndex);

  return (
    <Box padding="10px">
      <Box textAlign="center" mb={2}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ marginRight: '8px', width: '300px' }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          style={{
            background: '#f35b0c',
            color: '#fff',
            fontSize: '16px',
            lineHeight: '1.38',
            borderRadius: '26px',
            padding: '15px',
            marginBottom: '8px'
          }}
        >
          Search
        </Button>
      </Box>
      {loadingCustomers || loadingTransactions ? (
        <div>Loading...</div>
      ) : errorCustomers || errorTransactions ? (
        <div>Error: {errorCustomers || errorTransactions}</div>
      ) : customers.length === 0 ? (
        <div>No data found</div>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell>Birth Date</TableCell>
                  <TableCell>GSM Number</TableCell>
                  <TableCell>Card Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCustomers.map(customer => (
                  <Row
                    key={customer.CustomerID}
                    row={{
                      ...customer,
                      transactions: getCustomerTransactions(customer.CustomerID),
                    }}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(customers.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}
          />
        </>
      )}
    </Box>
  );
};

export default CollapsibleTable;