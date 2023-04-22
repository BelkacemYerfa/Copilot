type InputProps = {
  placeholderType: string;
  placeholderCase?: string;
  DataHolder?: string;
  RegisterInput: any;
};

const Input = ({
  placeholderType,
  placeholderCase,
  RegisterInput,
  DataHolder,
}: InputProps) => {
  return (
    <input
      type={placeholderType.toLowerCase() || placeholderCase}
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
