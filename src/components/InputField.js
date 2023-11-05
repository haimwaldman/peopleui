const InputField = ({ placeholder, value, onChange }) => {
  return (
    <div>
      <input
        className="table-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default InputField;
