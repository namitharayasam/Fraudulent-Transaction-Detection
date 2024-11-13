import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyTransactions.css';

const MyTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    field1: '', field2: '', field3: '', field4: '', field5: '', field6: '', field7: '', field8: '', field9: ''
  });
  const [user, setUser] = useState({}); // Initialize as an empty object

  useEffect(() => {
    // Fetch transactions data from the backend
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();

    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user_info');
        setUser(response.data);
      } catch(error) {
        console.error('Could not fetch user', error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value
    });
  };

  const addTransaction = async () => {
    try {
      const response = await axios.post('http://localhost:8000/add_transaction', newTransaction);
      setTransactions([...transactions, response.data]);
      setNewTransaction({
        field1: '', field2: '', field3: '', field4: '', field5: '', field6: '', field7: '', field8: '', field9: ''
      }); // Reset all fields
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div>
      <h2>My Transactions</h2>
      {user.name && <span>{user.name}</span>} {/* Display user name if available */}
      <div className="transactions-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Transaction Amount</th>
              <th>Transaction Date</th>
              <th>Transaction Time</th>
              <th>Transaction Location</th>
              <th>Transaction Type</th>
              <th>Current Account Balance</th>
              <th>Receiver Location</th>
              <th>Receiver Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.field1}</td>
                <td>{transaction.field2}</td>
                <td>{transaction.field3}</td>
                <td>{transaction.field4}</td>
              </tr>
            ))}
            <tr>
              <td><input type="text" name="field1" value={newTransaction.field1} onChange={handleInputChange} /></td>
              <td><input type="text" name="field2" value={newTransaction.field2} onChange={handleInputChange} /></td>
              <td><input type="text" name="field3" value={newTransaction.field3} onChange={handleInputChange} /></td>
              <td><input type="text" name="field4" value={newTransaction.field4} onChange={handleInputChange} /></td>
              <td><input type="text" name="field5" value={newTransaction.field5} onChange={handleInputChange} /></td>
              <td><input type="text" name="field6" value={newTransaction.field6} onChange={handleInputChange} /></td>
              <td><input type="text" name="field7" value={newTransaction.field7} onChange={handleInputChange} /></td>
              <td><input type="text" name="field8" value={newTransaction.field8} onChange={handleInputChange} /></td>
              <td><input type="text" name="field9" value={newTransaction.field9} onChange={handleInputChange} /></td>
            </tr>
          </tbody>
        </table>
        <button className="new-transaction-btn" onClick={addTransaction}>+ New</button>
      </div>
    </div>
  );
};

export default MyTransactions;

