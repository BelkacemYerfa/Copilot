import Audio from "../../../assets/icons/audio.svg";
import picture from "../../../assets/icons/picture.svg";
import send from "../../../assets/icons/send.svg";

export const ChatInput = () => {
  return (
    <section className="flex w-full items-center bg-auth_bg_main_color rounded-2xl p-3 gap-x-4">
      <div className="flex items-center gap-x-2 ">
        <div>
          <img src={Audio} alt="audio Icon" />
        </div>
        <div>
          <img src={picture} alt="picture Icon" />
        </div>
      </div>
      <form action="" className="flex item-center gap-x-2 w-full">
        <input
          type="text"
          className="bg-transparent border-none outline-none focus-within:outline-none w-full "
          placeholder="Type Something ..."
        />
        <button type="submit">
          <img src={send} alt="send Icon" />
        </button>
      </form>
    </section>
  );
};
