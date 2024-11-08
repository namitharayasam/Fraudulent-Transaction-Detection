import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MyAccount.css";

const MyAccount = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchLatestUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get_user/peter.parker@gmail.com');
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching latest user data:', error);
      }
    };
    fetchLatestUserData();
  }, []);

  if (!userInfo) return <p>Loading...</p>;

  return (
    <div className='account-container'>
      <h2>My Account</h2>
      <div className='info-block'><strong>Name:</strong> {userInfo.First_Name} {userInfo.Middle_Name} {userInfo.Last_Name}</div>
      <div className='info-block'><strong>Email:</strong> {userInfo.Email}</div>
      <div className='info-block'><strong>Phone:</strong> {userInfo.Phone}</div>
      <div className='info-block'><strong>Bank Name:</strong> {userInfo.Bank_Name}</div>
      <div className='info-block'><strong>Account Type:</strong> {userInfo.Acc_Type}</div>
      <div className='info-block'><strong>Balance:</strong> ${userInfo.Balance.toFixed(2)}</div>
      <div className='info-block'><strong>Open Date:</strong> {userInfo.Open_Date}</div>
      <div className='info-block'><strong>Status:</strong> {userInfo.Is_Active ? "Active" : "Inactive"}</div>
    </div>
  );
};

export default MyAccount;
