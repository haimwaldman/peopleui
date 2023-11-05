import { useState } from "react";
import "./Person.css";
import InputField from "./InputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave,
  faTimes,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";

const Person = ({
  person,
  index,
  editIndex,
  toast,
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleDeleteClick,
}) => {
  const [id, setId] = useState(person.Id);
  const [name, setName] = useState(person.Name);
  const [email, setEmail] = useState(person.Email);
  const [selectedDate, setSelectedDate] = useState(
    person.DateOfBirth ? new Date(person.DateOfBirth) : null
  );
  const [selectedSex, setSelectedSex] = useState(person.Sex);
  const [phoneNumber, setPhoneNumber] = useState(person.phoneNumber);
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
    if (e.target.value === "" || e.target.value.match(regexes.numbers))
      setId(e.target.value);
    else {
      toast.error("Id can have only numbers!");
    }
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
    if (e.target.value === "" || e.target.value.match(regexes.numbers))
      setPhoneNumber(e.target.value);
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
  return (
    <>
      <tr key={index}>
        <td>
          {editIndex === index ? (
            <InputField
              label="ID"
              isRequired={true}
              placeholder="ID"
              value={id}
              onChange={handleIdChange}
            />
          ) : (
            person.Id
          )}
        </td>
        <td>
          {editIndex === index ? (
            <InputField
              label="Name"
              isRequired={true}
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
          ) : (
            person.Name
          )}
        </td>
        <td>
          {" "}
          {editIndex === index ? (
            <InputField
              label="Email"
              isRequired={true}
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          ) : (
            person.Email
          )}
        </td>
        <td>
          {editIndex === index ? (
            <div>
              <DatePicker
                placeholderText="Date of birth"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          ) : (
            person.DateOfBirth
          )}
        </td>
        <td>
          {editIndex === index ? (
            <div className="select">
              <Select
                options={sexOptions}
                value={selectedSex}
                onChange={handleSexChange}
              />
            </div>
          ) : (
            person.Sex
          )}
        </td>
        <td>
          {editIndex === index ? (
            <InputField
              label="Phone Number"
              isRequired={false}
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          ) : (
            person.Phone
          )}
        </td>
        <td>
          {index !== editIndex ? (
            <div>
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => handleEditClick(index)}
                title="Edit"
              />
              <FontAwesomeIcon
                icon={faDeleteLeft}
                onClick={() => handleDeleteClick(index)}
                title="Delete"
              />
            </div>
          ) : (
            <div>
              <FontAwesomeIcon
                onClick={() => {
                  if (validateFieldsOnSubmit()) {
                    handleSaveClick({
                      Id: parseInt(id),
                      Name: name,
                      Email: email,
                      DateOfBirth: selectedDate
                        ? formatDate(selectedDate)
                        : null,
                      Sex: selectedSex ? selectedSex.value : null,
                      Phone: phoneNumber ? parseInt(phoneNumber) : null,
                    });
                  }
                }}
                icon={faSave}
                title="Save"
              />
              <FontAwesomeIcon
                onClick={() => handleCancelClick(-1)}
                icon={faTimes}
                title="Cancel"
              />
            </div>
          )}
        </td>
      </tr>
    </>
  );
};
export default Person;
