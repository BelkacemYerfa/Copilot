type SignProps = {
  text: string;
};

const SignBtn = ({ text }: SignProps) => {
  return (
    <button className="bg-main_color p-main_btn_padding w-full text-[18px]/7 text-white font-semibold rounded-lg">
      {text}
    </button>
  );
};

export default SignBtn;
