import { useAuthUser } from "../../../hooks/useAuthUser";
import { useState, useEffect } from "react";
import like from "../../../assets/icons/like.svg";
import dislike from "../../../assets/icons/dislike.svg";
import ai from "../../../assets/icons/ai.svg";
import modify from "../../../assets/icons/modify.svg";
import { IUserChat } from "../../../@types/chat";

interface ChatMessageProps {
  userId: string;
  messages: IUserChat[];
}

export const ChatMessage = ({ userId, messages }: ChatMessageProps) => {
  const {
    user: { name, email },
  } = useAuthUser();
  //get the user user id
  return (
    <section className="">
      {messages.map((message) => (
        <div
          key={message.id + message.name}
          style={{
            backgroundColor:
              message.name !== "Copilote" ? "#FFFFFF" : "#F7F9FB",
          }}
          className="w-full h-fit p-4 pl-6"
        >
          <div className="max-w-[80%] m-auto flex items-start justify-between">
            <div className="flex items-start gap-x-4">
              <div>
                {message.name === "Copilote" ? (
                  <div>
                    <img src={ai} alt="ai" className="h-10 w-10" />
                  </div>
                ) : (
                  <div className="rounded-full bg-black h-10 w-10">
                    <img
                      src={message?.profilePicture}
                      className="rounded-full h-full w-full object-cover "
                      alt={`@${message.name}`}
                    />
                  </div>
                )}
              </div>
              <p className="font-normal text-base text-main_color ">
                {message.message}
              </p>
            </div>
            {message.name === "Copilote" ? (
              <div className="flex item-center gap-x-2">
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-lg duration-200 ease-in-out hover:bg-white`}
                >
                  {/*make this component reusable */}
                  <img
                    src={like}
                    className="cursor-pointer h-4 w-4 "
                    alt="like"
                  />
                </div>
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-lg duration-200 ease-in-out hover:bg-white`}
                >
                  <img
                    src={dislike}
                    className="cursor-pointer h-4 w-4 "
                    alt="dislike"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-7 h-7 rounded-lg duration-200 ease-in-out hover:bg-auth_bg_main_color">
                <img
                  src={modify}
                  className="cursor-pointer h-4 w-4 "
                  alt="modify"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

interface Props {
  textArray: string[];
}

const WritingAnimation = ({ textArray }: Props) => {
  const [currentText, setCurrentText] = useState("");
  const [letterCount, setLetterCount] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setInterval(() => {});
    const interval = setTimeout(() => {
      if (
        letterCount === textArray[index].length &&
        index === textArray.length - 1
      ) {
        clearInterval(interval);
      } else if (letterCount === textArray[index].length) {
        setIndex((prevIndex) => prevIndex + 1);
        setLetterCount(0);
      } else {
        setCurrentText((prevText) => prevText + textArray[index][letterCount]);
        setLetterCount((prevCount) => prevCount + 1);
      }
    }, 10);
    return () => clearTimeout(interval);
  }, [index, letterCount, textArray]);

  return (
    <div className="w-full">
      <pre className="w-full">{currentText}</pre>
    </div>
  );
};
