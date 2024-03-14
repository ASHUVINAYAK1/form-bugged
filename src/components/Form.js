import React, { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from './Utils';
import './Form.css'; 
import {toast} from 'react-toastify';


const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    address: '',
    phone: '',
    message: ''
  });
  

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.dob || !formData.address || !formData.phone || !formData.message){
      toast.error("Please fill in all the required fields");
    }
    else{
    if (
      formData.name &&
      formData.email &&
      formData.dob &&
      formData.address &&
      formData.phone &&
      formData.message
      
    )
    toast.success("submited");
     {
    saveToLocalStorage(formData);
      console.log('Form submitted:', formData);
    }
  }
  };

  return (
    <div className="form-container">
      <h2>Get in Touch</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="Email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="Number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            // required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn" >Submit</button>
      </form>
    </div>
  );
};

export default Form;
