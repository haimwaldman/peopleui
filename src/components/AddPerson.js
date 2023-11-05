import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
// import toast, { Toaster } from "react-hot-toast";

import "./AddPerson.css";
import InputField from "./InputField";
const AddPerson = ({ onAdd, toast }) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSex, setSelectedSex] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const regexes = {
    numbers: /^[0-9]+$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  };
  const sexOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];
  const handleIdChange = (e) => {
    if (e.target.value.match(regexes.numbers)) setId(e.target.value);
    else toast.error("Id can have only numbers!");
  };
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleSexChange = (selectedOption) => {
    setSelectedSex(selectedOption);
  };
  const handlePhoneNumberChange = (e) => {
    if (e.target.value.match(regexes.numbers)) setPhoneNumber(e.target.value);
    else {
      toast.error("Phone number can have only numbers!");
    }
  };
  const validateFieldsOnSubmit = () => {
    let validated = false;
    if (!id) {
      toast.error("ID is a required field!");
    } else if (!name) {
      toast.error("Name is a required field!");
    } else if (!email) {
      toast.error("Email is a required field!");
    } else if (email && !email.match(regexes.email)) {
      toast.error("Email is not valid!");
    } else validated = true;
    return validated;
  };

  const formatDate = (dateInput) => {
    let yyyy = dateInput.getFullYear();
    let mm = dateInput.getMonth();
    if (mm < 10) mm = "0" + mm;
    let dd = dateInput.getDay();
    if (dd < 10) dd = "0" + dd;
    return `${yyyy}-${mm}-${dd}`;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let isValid = validateFieldsOnSubmit();
    if (isValid) {
      const person = {
        Id: parseInt(id),
        Name: name,
        Email: email,
        DateOfBirth: selectedDate ? formatDate(selectedDate) : null,
        Sex: selectedSex ? selectedSex.value : null,
        Phone: phoneNumber ? parseInt(phoneNumber) : null,
      };
      setId(null);
      setName("");
      setEmail("");
      setSelectedDate(null);
      setSelectedSex(null);
      setPhoneNumber(null);
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
              <label>ID *</label>
              <InputField
                label="ID"
                isRequired={true}
                placeholder="ID"
                value={id}
                onChange={handleIdChange}
              />
            </div>
            <div>
              <label>Name *</label>
              <InputField
                label="Name"
                isRequired={true}
                placeholder="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div>
              <label>Email *</label>
              <InputField
                label="Email"
                isRequired={true}
                placeholder="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label>Date Of Birth</label>
              <DatePicker
                placeholderText="Date of birth"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div>
              <label>Phone Number</label>
              <InputField
                label="Phone Number"
                isRequired={false}
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
            <div className="select">
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
