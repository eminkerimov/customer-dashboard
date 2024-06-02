import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/header";
import Sidebar from "./layout/sidebar";
import Main from "./layout/main";
import CreateCustomer from "./pages/createCustomer";
import CustomerList from "./pages/customerList";
import "./i18n";
import "./App.scss";
import PurpleLoader from "./components/loader";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const { loading: loadingCustomers } = useSelector(
    (state: RootState) => state.customers
  );

  const { loading: loadingTransactions } = useSelector(
    (state: RootState) => state.transactions
  );

  return (
    <Router>
      <div className="container">
        {(loadingCustomers || loadingTransactions) && <PurpleLoader />}
        <Header />
        <Sidebar />
        <Main>
          <Routes>
            <Route path="/create" element={<CreateCustomer />} />
            <Route path="/" element={<CustomerList />} />
          </Routes>
        </Main>
      </div>
    </Router>
  );
};

export default App;
