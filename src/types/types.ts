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
  