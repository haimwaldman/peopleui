import Person from "./Person";
import "./People.css";
const People = (props) => {
  const { people, toast } = props;
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
            <Person person={person} key={person.Id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default People;
