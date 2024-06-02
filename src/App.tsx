import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/header";
import Sidebar from "./layout/sidebar";
import Main from "./layout/main";
import CreateCustomer from "./pages/createCustomer";
import CustomerList from "./pages/customerList";
import './i18n'; 
import "./App.scss";

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
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
