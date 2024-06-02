import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Row from "../../components/row/index";
import Pagination from "@mui/material/Pagination";
import { filterCustomers } from "../../redux/reducers/customersReducer";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchCustomers } from "../../redux/actions/customersActions";
import { fetchTransactions } from "../../redux/actions/transactionsActions";
import MainButton from "../../components/mainButton";
import SecondaryButton from "../../components/secondaryButton";
import "./index.scss"

const CollapsibleTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const {
    filteredCustomers: customers,
  } = useSelector((state: RootState) => state.customers);

  const {
    transactions,
  } = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(filterCustomers(searchQuery));
  };

  const getCustomerTransactions = (customerID: string) => {
    console.log("customerID:", customerID);
    console.log(transactions.filter((t) => t.CustomerID === customerID));
    return transactions.filter((t) => t.CustomerID === customerID);
  };

  const handleClearSearch = () => {
    if (searchQuery) {
      setSearchQuery("");
      dispatch(fetchCustomers());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const rowsPerPage = 5;
  const lastIndex = page * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const paginatedCustomers = customers.slice(firstIndex, lastIndex);

  return (
    <Box padding="5px 20px">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="10px"
        m={3}
      >
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ width: "400px" }}
        />
        <MainButton
          variant="contained"
          onClick={handleSearch}
          className="mainBtn"
        >
          Search
        </MainButton>
        <SecondaryButton
          variant="contained"
          onClick={handleClearSearch}
          className="mainBtn"
        >
          Clear
        </SecondaryButton>
      </Box>
      <TableContainer component={Paper}  className="customTable">
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
            {paginatedCustomers?.length ? (
              paginatedCustomers.map((customer) => (
                <Row
                  key={customer.CustomerID}
                  row={{
                    ...customer,
                    transactions: getCustomerTransactions(customer.CustomerID),
                  }}
                />
              ))
            ) : (
              <Box display="flex" alignItems="center" justifyContent="center">NO DATA FOUND</Box>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(customers.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      />
    </Box>
  );
};

export default CollapsibleTable;
