import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Customer, Transaction } from "../../types/types";
import MainButton from "../mainButton";
import SecondaryButton from "../secondaryButton";

interface RowProps {
  row: Customer & { transactions: Transaction[] };
  onRemoveCard: (customerID: string, reason: string) => void;
}

const Row: React.FC<RowProps> = ({ row, onRemoveCard }) => {
  const [open, setOpen] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customReason, setCustomReason] = useState("");
  const [reasonType, setReasonType] = useState("");

  const handleRemoveCard = () => {
    const reason = reasonType === "other" ? customReason : reasonType;
    onRemoveCard(row.CustomerID, reason);
    setDialogOpen(false);
    setCustomReason("");
    setReasonType("");
  };

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          "& > .MuiTableCell-root": {
            padding: "0px",
          },
        }}
      >
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
          {showCardNumber
            ? row.CardNumber
            : "**** **** **** " + row.CardNumber.slice(-4)}
          <IconButton onClick={() => setShowCardNumber(!showCardNumber)}>
            {showCardNumber ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="remove card"
            size="small"
            onClick={() => setDialogOpen(true)}
            style={{ color: "#3759b8" }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                    row.transactions.map((transaction) => (
                      <TableRow key={transaction.TransactionID}>
                        <TableCell component="th" scope="row">
                          {transaction.TransactionDate}
                        </TableCell>
                        <TableCell align="right">
                          {transaction.TransactionAmount}
                        </TableCell>
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
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Cancel Debit Card</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Cancellation Reason</InputLabel>
            <Select
              value={reasonType}
              onChange={(e) => setReasonType(e.target.value)}
              label="Cancellation Reason"
            >
              <MenuItem value="Front office agent">Front office agent</MenuItem>
              <MenuItem value="Call Center agent">Call Center agent</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          {reasonType === "other" && (
            <TextField
              margin="dense"
              label="Specify Reason"
              fullWidth
              variant="outlined"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <SecondaryButton onClick={() => setDialogOpen(false)}>
            Cancel
          </SecondaryButton>
          <MainButton
            onClick={handleRemoveCard}
            color="primary"
            disabled={!reasonType || (reasonType == "other" && !customReason)}
          >
            Confirm
          </MainButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Row;
