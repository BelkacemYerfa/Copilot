import { useAuthUser } from "../../../hooks/useAuthUser";
import { useState, useEffect } from "react";
import like from "../../../assets/icons/like.svg";
import dislike from "../../../assets/icons/dislike.svg";
import ai from "../../../assets/icons/ai.svg";
import modify from "../../../assets/icons/modify.svg";

interface ChatMessageProps {
  userId: string;
}

export const ChatMessage = ({ userId }: ChatMessageProps) => {
  const {
    user: { name, email },
  } = useAuthUser();
  //get the user user id
  return <section className="">hello</section>;
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

interface ChatImageOptionProps {
  src: string;
  user: string;
}

const ChatImageOption = ({ src, user }: ChatImageOptionProps) => {
  return (
    <div
      className={`cursor-pointer flex items-center justify-center w-7 h-7 rounded-lg duration-200 ease-in-out ${
        user === "Copilote" ? "hover:bg-white" : "hover:bg-auth_bg_main_color"
      }`}
    >
      <img src={src} className="h-4 w-4 " alt={src.toString()} />
    </div>
  );
};
