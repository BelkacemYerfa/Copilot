export interface IUser {
  username: string;
  profilePicture?: string;
  email: string;
}

export interface ITheme {
  theme?: string;
}

export type AuthContextType = {
  user: IUser;
  setUser: (user: IUser) => void;
};
