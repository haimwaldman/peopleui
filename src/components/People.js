import { useState } from "react";
import Person from "./Person";
import "./People.css";
const People = ({ people, toast, saveEditPerson, deletePerson }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const handleEditClick = (ind) => {
    setEditIndex(ind);
  };
  const handleCancelClick = () => {
    setEditIndex(-1);
  };
  const handleSaveClick = () => {
    setEditIndex(-1);
  };
  const handleDeleteClick = () => {};
  return (
    <div className="table-container">
      <h2>List of People</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date Of Birth</th>
            <th>Sex</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <Person
              handleEditClick={handleEditClick}
              handleSaveClick={handleSaveClick}
              handleCancelClick={handleCancelClick}
              handleDeleteClick={handleDeleteClick}
              person={person}
              key={person.Id}
              index={person.Id}
              editIndex={editIndex}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default People;
