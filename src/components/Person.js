const Person = (props) => {
  const { person } = props;
  return (
    <>
      <tr>
        <td>{props.person.Id}</td>
        <td>{props.person.Name}</td>
        <td>{props.person.Email}</td>
        <td>{props.person.DateOfBirth}</td>
        <td>{props.person.Sex}</td>
        <td>{props.person.Phone}</td>
      </tr>
    </>
  );
};
export default Person;
