import {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useReducer,
} from "react";
import { IUser, ITheme } from "../@types/auth";

interface IStateType {
  user: IUser;
  theme: ITheme;
}

export const initialState: IStateType = {
  user: { username: "", profilePicture: "", email: "" },
  theme: { theme: "" },
};

const enum REDUCER_ACTIONS {
  SET,
}

type Reducer_Action = {
  type: REDUCER_ACTIONS;
  payload?: string;
};

const reducer = (state: IStateType, action: Reducer_Action): IStateType => {
  switch (action.type) {
    case REDUCER_ACTIONS.SET:
      return { ...state, user: state.user };
    default:
      return state;
  }
};

type ChildrenType = {
  children: ReactElement;
};

const useAuthContext = (initialState: IStateType) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const set = useCallback(
    () => dispatch({ type: REDUCER_ACTIONS.SET, payload: "" }),
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
  return (
    <AuthContext.Provider value={useAuthContext(initialState)}>
      {children}
    </AuthContext.Provider>
  );
};

//export const AuthContext = createContext<AuthContextType>(initialState);
