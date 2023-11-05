import React, { useState, useEffect } from "react";
import "./App.css";
import People from "./components/People";
import AddPerson from "./components/AddPerson";
import toast, { Toaster } from "react-hot-toast";
const SERVER_DOMAIN = "https://localhost:7202/api/";
function App() {
  const [people, setPeople] = useState([]);
  const [showAddPerson, setShowAddPerson] = useState(false);

  useEffect(() => {
    const getPeople = async () => {
      const peopleFromServer = await fetchPeople();
      setPeople(peopleFromServer);
    };
    getPeople();
  }, []);
  const fetchPeople = async () => {
    const res = await fetch(`${SERVER_DOMAIN}People`);
    const data = await res.json();
    return data;
  };
  const addPerson = async (person) => {
    const res = await fetch(`${SERVER_DOMAIN}People`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    const data = await res.json();
    if (data === "Added Successfuly") setPeople([...people, person]);
    else {
      console.log(data);
      toast.error("Error saving data, see logs or call support.");
    }
  };

  const saveEditPerson = async (person) => {
    const res = await fetch(`${SERVER_DOMAIN}People`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    const data = await res.json();
    if (data === "Updated Successfuly") setPeople(fetchPeople());
    else {
      console.log(data);
      toast.error("Error saving data, see logs or call support.");
    }
  };
  const deletePerson = async (id) => {
    const res = await fetch(`${SERVER_DOMAIN}People/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(person),
    });
    const data = await res.json();
    if (data === "Updated Successfuly") setPeople(fetchPeople());
    else {
      console.log(data);
      toast.error("Error saving data, see logs or call support.");
    }
  };
  const toggleShowPerson = () => {
    setShowAddPerson(!showAddPerson);
  };
  return (
    <div className="App">
      <div className="add-table-row">
        <button type="button" className="add-button" onClick={toggleShowPerson}>
          Click to add a person
        </button>
      </div>
      {showAddPerson && <AddPerson onAdd={addPerson} toast={toast} />}
      {people.length > 0 ? (
        <People
          people={people}
          toast
          onSaveEdit={saveEditPerson}
          onDelete={deletePerson}
        />
      ) : (
        "Nothing to show here"
      )}
      <Toaster
        position="buttom-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
