interface RoomLinkProps {
  text: string;
  Icon: string;
}

export const Setting = ({ text, Icon }: RoomLinkProps) => {
  return (
    <button className="flex items-center px-4 py-3 gap-x-[14.25px] text-sm font-normal text-main_color duration-300 ease-in-out rounded-lg hover:bg-auth_bg_main_color ">
      <div>
        <img src={Icon} alt={text} />
      </div>
      {text}
    </button>
  );
};
