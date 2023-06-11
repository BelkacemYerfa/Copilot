interface RoomLinkProps {
  text: string;
  Icon: string;
  resize: boolean;
  onClick?: () => void;
}

export const Setting = ({ text, Icon, resize, onClick }: RoomLinkProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-3 gap-x-[14.25px] text-sm font-normal text-main_color duration-300 ease-in-out rounded-lg hover:bg-auth_bg_main_color ${
        resize ? "justify-center" : "justify-start"
      }`}
    >
      <div>
        <img src={Icon} alt={text} />
      </div>
      {!resize ? <p className="truncate">{text}</p> : null}
    </button>
  );
};
