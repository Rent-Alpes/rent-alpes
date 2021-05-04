const InputAutocompleteAdress = (props) => {
  return (
    <div className="row form-group justify-content-start">
      <label>{props.label}</label>
      <div className="relative z-0 w-full mb-5">
        <input
          type="text"
          defaultValue={props.value}
          onChange={props.onChange}
          className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
};

export default InputAutocompleteAdress;
