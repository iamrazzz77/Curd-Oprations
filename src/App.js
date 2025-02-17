import React, { useEffect, useState } from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.find((item) => item.id === id);
    if (dt) {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt.firstName);
      setLastName(dt.lastName);
      setAge(dt.age);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete this item?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let error = '';

    if (!firstName) error += 'First name is required. ';
    if (!lastName) error += 'Last name is required. ';
    if (age <= 0) error += 'Age must be greater than zero.';

    if (!error) {
      const newObject = {
        id: data.length + 1,
        firstName,
        lastName,
        age,
      };

      setData([...data, newObject]);
      handleClear(); // Clear input fields
    } else {
      alert(error);
    }
  };

  const handleUpdate = () => {
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedData = [...data];
      updatedData[index] = { id, firstName, lastName, age };

      setData(updatedData);
      handleClear(); // Reset form and switch back to Save mode
    }
  };

  const handleClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setAge(0);
    setIsUpdate(false);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Employee Form</h2>
        <label>First Name:</label>
        <input type="text" placeholder="Enter First name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
        <label>Last Name:</label>
        <input type="text" placeholder="Enter Last name" onChange={(e) => setLastName(e.target.value)} value={lastName} />
        <label>Age:</label>
        <input type="number" placeholder="Enter Age" onChange={(e) => setAge(Number(e.target.value))} value={age} />
        <div className="button-group">
          {!isUpdate ? (
            <button className="btn btn-primary" onClick={handleSave}>Add</button>
          ) : (
            <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
          )}
          <button className="btn btn-danger" onClick={handleClear}>Clear</button>
        </div>
      </div>
      
      <div className="table-container">
        <h2>Employee List</h2>
        <table>
          <thead>
            <tr>
              <td>Sr. No.</td>
              <td>ID</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Age</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
