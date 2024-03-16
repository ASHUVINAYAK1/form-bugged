import React, { useState, useEffect } from "react";
import { saveToLocalStorage, loadFromLocalStorage } from "./Utils";
import "./Form.css";
import { toast } from "react-toastify";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    address: "",
    phone: "",
    message: "",
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
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyPress = (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      toast.error("Invalid Phone number!");
    } else if (e.code === "Backspace") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value.substring(0, e.target.value.length - 1),
      });
    } else if (e.code === "Minus") {
      toast.error("Invalid Phone number!");
    } else if (e.target.value.length >= 10) {
      toast.error("Invalid Phone number!");
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value + Number(e.key),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.dob &&
      formData.address &&
      formData.phone &&
      formData.message
    ) {
      saveToLocalStorage(formData);
    }
  };

  const raise_toast = () => {
    if (
      document.getElementById("name").value &&
      document.getElementById("email").value &&
      document.getElementById("dob").value &&
      document.getElementById("address").value &&
      document.getElementById("phone").value &&
      document.getElementById("message").value
    )
      toast.success("Form submitted successfully!");
    else toast.error("Please fill all the fields!");
  };

  const clearStorage = () => {
    localStorage.clear();
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
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
            required
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={formData.phone}
            onKeyDown={handleKeyPress}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" onClick={raise_toast} className="submit-btn">
          Submit
        </button>
        <button type="reset" onClick={clearStorage} className="reset-btn">
          Clear form
        </button>
      </form>
    </div>
  );
};

export default Form;
