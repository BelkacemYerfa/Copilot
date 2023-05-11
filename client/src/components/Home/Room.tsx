import { useAuthUser } from "../../hooks/useAuthUser";
import { useState, useEffect } from "react";

interface RoomProps {
  id: string;
}

const Room = ({ id }: RoomProps) => {
  const { user } = useAuthUser();
  return (
    <section>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>page id : {id}</p>
      <WritingAnimation
        textArray={[
          "Hello, world! \n",
          "Welcome to my website! \n",
          "Let's create something amazing! \n",
        ]}
      />
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
    }, 50);
    return () => clearTimeout(interval);
  }, [index, letterCount, textArray]);

  return (
    <div>
      <pre>{currentText}</pre>
    </div>
  );
};

export default Room;
