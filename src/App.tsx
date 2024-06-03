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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogViewer from "./pages/logViewer";

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
            <Route path="/logs" element={<LogViewer />} />
          </Routes>
        </Main>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
