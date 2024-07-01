import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import "./index.scss"

const LogViewer = () => {
  const customerLogs = useSelector((state:RootState) => state.customers.logs);
  const transactionLogs = useSelector((state:RootState) => state.transactions.logs);

  const formatTimestamp = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return 'Invalid Date'; // Return a placeholder for invalid dates
    } else {
      return date.toDateString() + ' ' + date.toLocaleTimeString(); // Format valid dates
    }
  };  

  return (
    <div className="log-viewer-container">
      <div className="log-section">
        <h2 className="log-header">Customer Logs:</h2>
        <ul className="log-list">
          {customerLogs.map((log, index) => (
            <li key={index} className="log-item">{formatTimestamp(log.timestamp)} - {log.message}</li>
          ))}
        </ul>
      </div>
      <div className="log-section">
        <h2 className="log-header">Transaction Logs:</h2>
        <ul className="log-list">
          {transactionLogs.map((log, index) => (
            <li key={index} className="log-item">{formatTimestamp(log.timestamp)} - {log.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LogViewer;
