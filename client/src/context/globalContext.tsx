import { ReactElement, createContext, useCallback, useReducer } from "react";
import { IUser, ITheme, IPrompt } from "../@types/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/shared/loader/Loader";
import { ICreapted } from "../@types/creapted";
interface IStateType {
  user: IUser;
  theme: ITheme;
  creaptedCode: ICreapted;
  userPrompt: IPrompt;
}

export let initialState: IStateType = {
  user: { name: "", email: "", profilePicture: "" },
  theme: { theme: "" },
  creaptedCode: { creaptedCode: "" },
  userPrompt: { message: "" },
};

const enum REDUCER_ACTIONS {
  SET_USER_DATA,
  SET_CREAPTED_PASS,
  SET_USER_PROMPT_MESSAGE,
}

type Reducer_Action = {
  type: REDUCER_ACTIONS;
  payload: IUser | ICreapted | IPrompt;
};

const reducer = (state: IStateType, action: Reducer_Action): IStateType => {
  switch (action.type) {
    case REDUCER_ACTIONS.SET_USER_DATA:
      return {
        ...state,
        user: action.payload as IUser,
      };
    case REDUCER_ACTIONS.SET_CREAPTED_PASS:
      return {
        ...state,
        creaptedCode: action.payload as ICreapted,
      };
    case REDUCER_ACTIONS.SET_USER_PROMPT_MESSAGE:
      return {
        ...state,
        userPrompt: action.payload as IPrompt,
      };
    default:
      throw new Error();
  }
};

type ChildrenType = {
  children: ReactElement;
};

const useAuthContext = (initialState: IStateType) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const set = useCallback((user: IUser) => {
    dispatch({ type: REDUCER_ACTIONS.SET_USER_DATA, payload: user });
  }, []);
  const setCreaptedPass = useCallback(
    (creaptedPass: ICreapted) =>
      dispatch({
        type: REDUCER_ACTIONS.SET_CREAPTED_PASS,
        payload: creaptedPass,
      }),
    []
  );
  const setUserPrompt = useCallback((message: IPrompt) => {
    dispatch({
      type: REDUCER_ACTIONS.SET_USER_PROMPT_MESSAGE,
      payload: message,
    });
  }, []);
  const baseUrl = "http://localhost:8000/api/v1";

  return { state, set, baseUrl, setCreaptedPass, setUserPrompt };
};

type GlobalContextType = ReturnType<typeof useAuthContext>;

const initialContextState: GlobalContextType = {
  state: initialState,
  set: () => {},
  setCreaptedPass: () => {},
  setUserPrompt: () => {},
  baseUrl: "",
};

export const GlobalContext =
  createContext<GlobalContextType>(initialContextState);

export const GlobalProvider = ({
  children,
  ...initialState
}: ChildrenType & IStateType): ReactElement => {
  const { state, set, baseUrl, setCreaptedPass, setUserPrompt } =
    useAuthContext(initialState);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(["user"], async () => {
    const { data } = await axios.get(`${baseUrl}/islogged`, {
      withCredentials: true,
    });
    return data;
  });
  useEffect(() => {
    if (data?.user) {
      set(data.user);
      navigate("/");
    } else {
      navigate("/auth");
    }
  }, [data]);
  if (isLoading) return <Loader />;
  return (
    <GlobalContext.Provider
      value={{ set, state, baseUrl, setUserPrompt, setCreaptedPass }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
