import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
// import toast, { Toaster } from "react-hot-toast";

import "./AddPerson.css";
const AddPerson = ({ onAdd, toast }) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSex, setSelectedSex] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(0);

  const regexes = {
    numbers: /^[0-9]+$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  };
  const sexOptions = [
    { value: 0, label: "Male" },
    { value: 1, label: "Female" },
    { value: 2, label: "Other" },
  ];
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSexChange = (selectedOption) => {
    setSelectedSex(selectedOption);
  };
  const validateFieldsOnSubmit = () => {
    let validated = false;
    if (!name) {
      toast.error("Name is a required field!");
    } else if (!email) {
      toast.error("Email is a required field!", () => {});
    } else if (!email.match(regexes.email)) {
      toast.error("Email is not valid!");
    } else if (selectedDate === null) {
      toast.error("Date of birth is required!");
    } else validated = true;
    return validated;
  };

  const formatDate = (dateInput) => {
    let yyyy = dateInput.getFullYear();
    let mm = dateInput.getMonth();
    if (mm < 10) mm = "0" + mm;
    let dd = dateInput.getDay();
    if (dd < 10) dd = "0" + dd;
    return `${dd}/${mm}/${yyyy}`;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let isValid = validateFieldsOnSubmit();
    if (isValid) {
      const person = {
        id,
        name,
        email,
        dateOfBirth: formatDate(selectedDate),
        sex: selectedSex ? selectedSex.value : null,
        phone: phoneNumber,
      };
      setId(0);
      setName("");
      setEmail("");
      setSelectedDate(null);
      setSelectedSex(null);
      setPhoneNumber(0);
      onAdd(person);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <h2>Add Person</h2>
          <div className="add-table-row">
            <div>
              <label>Id</label>
              <input
                className="table-input"
                type="text"
                placeholder="ID"
                value={id}
                onChange={(e) => {
                  if (e.target.value.match(regexes.numbers))
                    setId(e.target.value);
                  else toast.error("Id can have only numbers!");
                }}
              />
            </div>
            <div>
              <label>Name</label>
              <input
                className="table-input"
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                className="table-input"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Date Of Birth</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div>
              <label>Phone Number</label>
              <input
                className="table-input"
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  if (e.target.value.match(regexes.numbers))
                    setPhoneNumber(e.target.value);
                  else toast.error("Phone number can have only numbers!");
                }}
              />
            </div>
            <div>
              <label>Sex</label>
              <Select
                options={sexOptions}
                value={selectedSex}
                onChange={handleSexChange}
              />
            </div>
          </div>
          <div className="add-table-row">
            <input type="submit" value="Save Person" className="add-button" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPerson;
