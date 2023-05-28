import { ColorRing } from "react-loader-spinner";

interface SignProps {
  text: string;
  disable: boolean;
  isLoading: boolean;
}

const SignBtn = ({ text, disable, isLoading }: SignProps) => {
  return (
    <button
      disabled={disable}
      type="submit"
      className={`relative bg-main_color p-main_input_padding w-full text-[18px]/7 text-white font-semibold rounded-lg ${
        disable || isLoading ? "cursor-not-allowed" : ""
      } flex items-center justify-center gap-x-2 `}
    >
      {isLoading ? (
        <ColorRing
          height={28}
          width={28}
          colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
        />
      ) : null}
      {text}
      <div
        className={`top-0 left-0 absolute rounded-lg bg-gray-400/40 w-full h-full duration-200 ease-in-out ${
          !disable && !isLoading ? "opacity-0" : "opacity-100"
        }`}
      ></div>
    </button>
  );
};

export default SignBtn;
