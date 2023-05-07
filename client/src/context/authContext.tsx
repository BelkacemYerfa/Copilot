import { ReactElement, createContext, useCallback, useReducer } from "react";
import { IUser, ITheme } from "../@types/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
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

  return { state, set };
};

type AuthContextType = ReturnType<typeof useAuthContext>;

const initialContextState: AuthContextType = {
  state: initialState,
  set: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialContextState);

export const AuthProvider = ({
  children,
  ...initialState
}: ChildrenType & IStateType): ReactElement => {
  const { state, set } = useAuthContext(initialState);
  const { user } = useAuthUser();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(["user"], async () => {
    const { data } = await axios.get("http://localhost:5000/api/v1/islogged", {
      withCredentials: true,
    });
    return data;
  });
  useEffect(() => {
    if (data?.user) {
      set(data.user);
      navigate("/");
    }
  }, [data]);
  return (
    <AuthContext.Provider value={{ set, state }}>
      {children}
    </AuthContext.Provider>
  );
};
