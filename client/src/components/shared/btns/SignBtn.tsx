type SignProps = {
  text: string;
  disable: boolean;
};

const SignBtn = ({ text, disable }: SignProps) => {
  return (
    <button
      disabled={disable}
      type="submit"
      className={`relative bg-main_color p-main_input_padding w-full text-[18px]/7 text-white font-semibold rounded-lg ${
        disable ? "cursor-not-allowed" : ""
      }`}
    >
      {text}
      <div
        className={`top-0 left-0 absolute rounded-lg bg-gray-400/40 w-full h-full ${
          disable ? "block" : "hidden"
        }`}
      ></div>
    </button>
  );
};

export default SignBtn;
