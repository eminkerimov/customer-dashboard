export interface Customer {
  CustomerID: string;
  Name: string;
  Surname: string;
  BirthDate: string;
  GSMNumber: string;
  CardNumber: string;
  }
  
  export interface Transaction {
    TransactionID: string;
    CustomerID: string;
    TransactionDate: string;
    TransactionAmount: string;
  }
  
  export interface TransactionsState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
  }
  export interface CustomersState {
    customers: Customer[];
    filteredCustomers: Customer[];
    loading: boolean;
    error: string | null;
  }

  export interface Register {
    surname: string;
    birthDate: string;
    gsmNumber: string;
    cardNumber: string;
    name: string;
  }