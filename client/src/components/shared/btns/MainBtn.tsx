interface BtnProps {
  text: string;
  Icon?: string; // Optional
}

const MainBtn = ({ text, Icon }: BtnProps) => {
  return (
    <button className="p-main_btn_padding w-full sm:w-fit border border-solid border-btn_border_color rounded-lg flex items-center justify-center gap-x-2 ">
      {Icon && <img src={Icon} alt={text} />}
      <p className="text-sm text-main_color font-normal">{text}</p>
    </button>
  );
};

export default MainBtn;
