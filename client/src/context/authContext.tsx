import { ReactElement, createContext, useCallback, useReducer } from "react";
import { IUser, ITheme } from "../@types/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import Loader from "../components/shared/loader/Loader";
interface IStateType {
  user: IUser;
  theme: ITheme;
}

export let initialState: IStateType = {
  user: { name: "", email: "" },
  theme: { theme: "" },
};

const enum REDUCER_ACTIONS {
  SET,
}

type Reducer_Action = {
  type: REDUCER_ACTIONS;
  payload: IUser;
};

const reducer = (state: IStateType, action: Reducer_Action): IStateType => {
  switch (action.type) {
    case REDUCER_ACTIONS.SET:
      return {
        user: action.payload,
        theme: state.theme,
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
  const set = useCallback(
    (user: IUser) => dispatch({ type: REDUCER_ACTIONS.SET, payload: user }),
    []
  );
  const baseUrl = "http://localhost:8000/api/v1";

  return { state, set, baseUrl };
};

type AuthContextType = ReturnType<typeof useAuthContext>;

const initialContextState: AuthContextType = {
  state: initialState,
  set: () => {},
  baseUrl: "",
};

export const AuthContext = createContext<AuthContextType>(initialContextState);

export const AuthProvider = ({
  children,
  ...initialState
}: ChildrenType & IStateType): ReactElement => {
  const { state, set, baseUrl } = useAuthContext(initialState);
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
    <AuthContext.Provider value={{ set, state, baseUrl }}>
      {children}
    </AuthContext.Provider>
  );
};
