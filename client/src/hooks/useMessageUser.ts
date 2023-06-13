import { IPrompt } from "../@types/auth";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

type useMessageType = {
  userPrompt: IPrompt;
  setUserPrompt: (prompt: IPrompt) => void;
};

export const useMessageUser = (): useMessageType => {
  const {
    state: { userPrompt },
    setUserPrompt,
  } = useContext(GlobalContext);
  return { userPrompt, setUserPrompt };
};
