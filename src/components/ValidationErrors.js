import "./ValidationError.css";
const ValidationErrors = ({ errors }) => {
  return (
    <div className="validation-errors">
      {errors.map((error, index) => (
        <div key={index} className="validation-error">
          {error}
        </div>
      ))}
    </div>
  );
};
export default ValidationErrors;
