import { ReactElement, createContext, useCallback, useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../components/shared/loader/Loader";
import { IChat } from "../@types/chat";
interface IStateType {
  Rooms: IChat[];
}

export let initialState: IStateType = {
  Rooms: [
    {
      id: "1",
      name: "Ai Chat Tool Ethics",
      createdAt: "2021-09-30T12:00:00.000Z",
      updatedAt: "2021-09-30T12:00:00.000Z",
      messages: [
        {
          id: "1",
          message: "Hello",
          createdAt: "2021-09-30T12:00:00.000Z",
          updatedAt: "2021-09-30T12:00:00.000Z",
          name: "John Doe",
          profilePicture:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg/1200px-John_Doe%2C_born_John_Nommensen_Duchac.jpg",
        },
        {
          id: "2",
          message: "Hello , I'm Copilote",
          createdAt: "2021-09-30T12:00:00.000Z",
          updatedAt: "2021-09-30T12:00:00.000Z",
          name: "Copilote",
        },
      ],
    },
  ],
};

const enum REDUCER_ACTIONS {
  SET_ROOMS_BASIC_DATA,
  SET_ROOMS_MESSAGES,
  CREATE_ROOM,
}

type Reducer_Action = {
  type: REDUCER_ACTIONS;
  payload: IChat;
};

const reducer = (state: IStateType, action: Reducer_Action): IStateType => {
  switch (action.type) {
    case REDUCER_ACTIONS.SET_ROOMS_BASIC_DATA:
      return {
        ...state,
        Rooms: {
          ...state.Rooms,
          [action.payload.id]: {
            ...action.payload,
          },
        },
      };
    case REDUCER_ACTIONS.SET_ROOMS_MESSAGES:
      return {
        ...state,
        Rooms: {
          ...state.Rooms,
          [action.payload.id]: {
            ...state.Rooms.map((room) => {
              if (room.id === action.payload.id) {
                return {
                  ...room,
                  messages: action.payload.messages,
                };
              }
              return room;
            }),
          },
        },
      };
    case REDUCER_ACTIONS.CREATE_ROOM:
      return {
        ...state,
        Rooms: [...state.Rooms, action.payload],
      };
    default:
      throw new Error();
  }
};

type ChildrenType = {
  children: ReactElement;
};

const useRoomInfo = (initialState: IStateType) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setRoomInfo = useCallback(
    (Room: IChat) =>
      dispatch({ type: REDUCER_ACTIONS.SET_ROOMS_BASIC_DATA, payload: Room }),
    []
  );
  const setRoomMessages = useCallback((Room: IChat) => {
    dispatch({ type: REDUCER_ACTIONS.SET_ROOMS_MESSAGES, payload: Room });
  }, []);
  const createRoom = useCallback(() => {
    dispatch({
      type: REDUCER_ACTIONS.CREATE_ROOM,
      payload: {
        id: `${crypto.randomUUID()}`,
        name: "Ai Chat Tool Ethics",
        createdAt: "2021-09-30T12:00:00.000Z",
        updatedAt: "2021-09-30T12:00:00.000Z",
        messages: [],
      },
    });
  }, []);
  const baseUrl = "http://localhost:8000/api/v1";

  return { state, setRoomInfo, setRoomMessages, createRoom, baseUrl };
};

type RoomContextType = ReturnType<typeof useRoomInfo>;

const initialContextState: RoomContextType = {
  state: initialState,
  setRoomInfo: () => {},
  setRoomMessages: () => {},
  createRoom: () => {},
  baseUrl: "",
};

export const RoomsInfoContext =
  createContext<RoomContextType>(initialContextState);

export const RoomsInfoProvider = ({
  children,
  ...initialState
}: ChildrenType & IStateType): ReactElement => {
  const { state, setRoomInfo, setRoomMessages, createRoom, baseUrl } =
    useRoomInfo(initialState);
  const { data, isLoading } = useQuery(["user"], async () => {
    const { data } = await axios.get(`${baseUrl}/getRoomRelatedInfo`, {
      withCredentials: true,
    });
    return data;
  });
  useEffect(() => {
    if (data?.Rooms) {
      setRoomInfo(data.Rooms);
    }
  }, [data]);
  if (isLoading) return <Loader />;
  return (
    <RoomsInfoContext.Provider
      value={{ setRoomInfo, setRoomMessages, createRoom, state, baseUrl }}
    >
      {children}
    </RoomsInfoContext.Provider>
  );
};
