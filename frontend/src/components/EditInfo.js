import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./EditInfo.css";

const EditInfo = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    First_Name: '',
    Middle_Name: '',
    Last_Name: '',
    Email: '',
    Phone: '',
    Acc_No: '',
    Bank_Name: '',
    Acc_Type: 'Savings',
    Balance: '0.00',
    Open_Date: '',
    Is_Active: true
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (formData.Email) {
        try {
          const response = await axios.get(`http://localhost:8000/get_user/${formData.Email}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [formData.Email]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/update_user/${formData.Email}`, formData);
      alert('User Updated Successfully!');
      navigate('/my-account');

    } catch (error) {
      console.error('Error updating/creating user:', error);
      alert('Failed to Update User');
    }
  };

  const toggleActiveStatus = () => {
    setFormData((prevData) => ({
      ...prevData,
      Is_Active: !prevData.Is_Active
    }));
  };

  return (
    <div className='total'> 
      <h2> Update Your Details </h2> 
      <form onSubmit={handleSubmit} className="form-container">
        <label className='long-label'> Name: </label>
        <div className="row">
          <input type="text" name="First_Name" placeholder="First Name" value={formData.First_Name} onChange={handleChange} required />
          <input type="text" name="Middle_Name" placeholder="Middle Name" value={formData.Middle_Name} onChange={handleChange} />
          <input type="text" name="Last_Name" placeholder="Last Name" value={formData.Last_Name} onChange={handleChange} required />
        </div>

        <label className='long-label'> Email and Phone: </label>
        <div className="row">
          <input type="email" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} required />
          <input type="tel" name="Phone" placeholder="Phone" value={formData.Phone} onChange={handleChange} required />
        </div>

        <label className='long-label'> Bank Name: </label>
        <input type="text" name="Bank_Name" placeholder="Bank Name" value={formData.Bank_Name} onChange={handleChange} required />

        <label className='long-label'> Account Number: </label>
        <input type="text" name="Acc_No" placeholder="Account Number" value={formData.Acc_No} onChange={handleChange} required />

        <label className='long-label'> Account Type: </label>
        <select name="Acc_Type" value={formData.Acc_Type} onChange={handleChange} required>
          <option value="Checking">Checking</option>
          <option value="Joint">Joint</option>
          <option value="Salary">Salary</option>
          <option value="Savings">Savings</option>
          <option value="Zero Balance">Zero Balance</option>
        </select>

        <label className='long-label'> Current Balance ($): </label>
        <input type="number" name="Balance" value={formData.Balance} onChange={handleChange} required />

        <div className="row">
          <div className="open-date-container">
            <label className="open-date-label">Account Open Date: </label>
            <input
              type="date"
              name="Open_Date"
              value={formData.Open_Date}
              onChange={handleChange}
            />
          </div>

          <div className="status-container">
            <label>Account Status:</label>
            <label
              className="active-checkbox"
              onClick={toggleActiveStatus}
              style={{
                backgroundColor: formData.Is_Active ? "#165e13" : "#e3fce5",
                color: formData.Is_Active ? "#e3fce5" : "#165e13"
              }}
            >
              {formData.Is_Active ? "Active" : "Inactive"}
            </label>
          </div>
        </div>

        <div className="button-container">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditInfo;
