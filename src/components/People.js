import { useState } from "react";
import Person from "./Person";
import "./People.css";
const People = ({ people, toast, onSave, onDelete }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const handleEditClick = (ind) => {
    setEditIndex(ind);
  };
  const handleCancelClick = () => {
    setEditIndex(-1);
  };
  const handleSaveClick = (person) => {
    setEditIndex(-1);
    onSave(person);
  };
  const handleDeleteClick = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (shouldDelete) {
      onDelete(id);
    }
  };
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
              toast={toast}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default People;
