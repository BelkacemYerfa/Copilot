type InputProps = {
  placeholderType: string;
  placeholderCase?: string;
  RegisterInput: any;
  inputType: string;
};

const Input = ({
  placeholderType,
  placeholderCase,
  RegisterInput,
  inputType,
}: InputProps) => {
  return (
    <input
      type={inputType}
      placeholder={placeholderType}
      {...RegisterInput(
        `${
          placeholderCase
            ? placeholderCase.split(" ").join("")
            : placeholderType.toLowerCase()
        }`
      )}
      className="border border-solid border-btn_border_color rounded-lg p-main_input_padding w-full outline-none placeholder:text-placeholder_color"
    />
  );
};

export default Input;
